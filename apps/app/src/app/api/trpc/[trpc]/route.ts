import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { NextRequest } from 'next/server';

import { env } from '@/env';
import { appRouter } from '@/routers/root';
import { createHTTPContext } from '@{workspace}/api/trpc';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createHTTPContext(req),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error, input, type }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`, {
              input,
              type,
            });
          }
        : undefined,
  });

export { handler as GET, handler as POST };
