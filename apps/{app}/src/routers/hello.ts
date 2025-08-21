import { createTRPCRouter, publicProcedure } from '@{workspace}/api/trpc';
import type { HelloRouter } from '@{workspace}/hello';
import { createTRPCClient, httpBatchStreamLink } from '@trpc/client';
import { z } from 'zod';
import { cookies } from 'next/headers';

const helloClient = createTRPCClient<HelloRouter>({
  links: [
    httpBatchStreamLink({
      url: 'http://localhost:5001/api',
      async headers() {
        // Pass on cookies, for auth
        const cookie = (await cookies()).toString();
        return { cookie };
      },
    }),
  ],
});

export const helloRouter = createTRPCRouter({
  sayHelloPublic: publicProcedure
    .input(z.string().optional())
    .query(({ input = 'world' }) => `Hello ${input}!`),

  // Don't need to check auth here, because the target service will do it
  sayHelloPrivate: publicProcedure
    .input(z.string().optional())
    .query(({ input }) => helloClient.sayHello.query(input)),
});
