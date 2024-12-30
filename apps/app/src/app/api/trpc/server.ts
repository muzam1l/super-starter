import 'server-only';

import { type appRouter, createCaller } from '@/routers/root';
import { createRSCContext } from '@{workspace}/api/trpc';

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';
import { makeQueryClient } from '@{workspace}/api/query-client';
// Create a stable getter for the query client that
//    will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

const caller = createCaller(createRSCContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);
