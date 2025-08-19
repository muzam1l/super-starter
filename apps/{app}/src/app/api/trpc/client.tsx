'use client';

import type { AppRouter } from '@/routers/root';
import { createTRPCReact } from '@trpc/react-query';
import { loggerLink, httpBatchStreamLink } from '@trpc/client';
import { getQueryClient } from '@{workspace}/api/query-client';
import { getBaseUrl } from '@{workspace}/utils/url';
import { useState, type PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

export const api = createTRPCReact<AppRouter>();

export const TRPCProvider = (props: PropsWithChildren) => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: op =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          // transformer: superjson,
          url: getBaseUrl() + '/api/trpc',
          headers: () => ({
            'x-trpc-source': 'nextjs-react', // TODO confirm
          }),
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </api.Provider>
  );
};
