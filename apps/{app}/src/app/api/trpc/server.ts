import 'server-only';

import { type appRouter, createCaller } from '@/routers/root';
import { createRSCContext } from '@{workspace}/api/trpc';

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { getQueryClient } from '@{workspace}/api/query-client';

export const { trpc: api, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  createCaller(createRSCContext),
  getQueryClient,
);
