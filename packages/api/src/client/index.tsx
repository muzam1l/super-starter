'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import {
  loggerLink,
  unstable_httpBatchStreamLink,
  type CreateTRPCReactBase,
} from '@trpc/react-query';
import { useState, type PropsWithChildren } from 'react';

import type { AnyTRPCRouter } from '@trpc/server';
import SuperJSON from 'superjson';
import { getBaseUrl } from '@{workspace}/utils/url';
import { QueryClient } from '@tanstack/react-query';

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined = undefined;
export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

type Api = Pick<CreateTRPCReactBase<AnyTRPCRouter, unknown>, 'createClient' | 'Provider'>;
export const getClientProvider =
  (api: Api, path: string = '/api/trpc') =>
  (props: PropsWithChildren) => {
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() =>
      api.createClient({
        links: [
          loggerLink({
            enabled: op =>
              process.env.NODE_ENV === 'development' ||
              (op.direction === 'down' && op.result instanceof Error),
          }),
          unstable_httpBatchStreamLink({
            transformer: SuperJSON,
            url: getBaseUrl() + path,
            headers: () => {
              const headers = new Headers();
              headers.set('x-trpc-source', 'nextjs-react');
              return headers;
            },
          }),
        ],
      }),
    );

    return (
      <QueryClientProvider client={queryClient}>
        <api.Provider client={trpcClient} queryClient={queryClient}>
          {props.children}
        </api.Provider>
      </QueryClientProvider>
    );
  };
