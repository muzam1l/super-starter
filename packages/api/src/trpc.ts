import { initTRPC, TRPCError } from '@trpc/server';

import { type Session } from 'next-auth';
import { headers as getHeaders } from 'next/headers';
import { type ReturnOf } from '@{workspace}/utils/types';
import { auth } from '@{workspace}/auth';
import { db } from './db';
import { cache } from 'react';
import type { NextRequest } from 'next/server';
/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  };
};

export type TRPCContext = ReturnOf<typeof createTRPCContext> & {
  session?: Session;
};

// type Meta = {
//   span: string;
// };

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * type errors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC
  .context<TRPCContext>()
  // .meta<Meta>()
  .create({
    // transformer: superjson,
    errorFormatter({ shape, error }) {
      const cause: unknown =
        error.cause instanceof AggregateError ? error.cause.errors[0] : error.cause;
      return {
        ...shape,
        // eslint-disable-next-line
        message: (cause as any)?.message,
        data: {
          ...shape.data,
          cause,
        },
      };
    },
  });

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Procedure with common middlewares
 * @see https://trpc.io/docs/procedures
 */
const procedure = t.procedure.use(async ({ ctx, next }) => {
  // Common logic across routes.
  return next({ ctx });
});

/**
 * Public (unauthenticated) procedure
 */
export const publicProcedure = procedure;

/**
 * Protected (authenticated) procedure
 */
export const protectedProcedure = procedure.use(async ({ ctx, next }) => {
  // Get auth session only for protected routes.
  // This makes public routes faster, but have to manually use `getAuthSession` to get the session.
  const session = await auth();

  if (!session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      ...ctx,
      session,
    },
  });
});

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
export const createRSCContext = cache(async () => {
  const headers = new Headers(await getHeaders());
  headers.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers,
  });
});

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
export const createHTTPContext = (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};
