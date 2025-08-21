import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query';
import { __SERVER__ } from '@{workspace}/utils/helpers';
import { cache } from 'react';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        // This is a function that determines whether a query should be dehydrated or not.
        // Since the RSC transport protocol supports hydrating promises over the network,
        // we extend the defaultShouldDehydrateQuery function to also include queries that are still pending.
        // This will allow us to start prefetching in a server component high up the tree,
        // then consuming that promise in a client component further down.
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  });
}

let clientQueryClientSingleton: QueryClient | undefined = undefined;
export const getQueryClient = () => {
  if (__SERVER__) {
    // Server: Create a stable getter for the query client that
    //    will return the same client during the same request.
    return cache(makeQueryClient)();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
};
