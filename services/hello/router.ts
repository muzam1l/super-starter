import { createTRPCRouter, protectedProcedure } from '@{workspace}/api/trpc';
import z from 'zod';

export const helloRouter = createTRPCRouter({
  sayHello: protectedProcedure.input(z.string().optional()).query(({ input = 'world', ctx }) => {
    const { user } = ctx.session;
    return `Hello ${input} from ${user.name || user.id}`;
  }),
});

export type HelloRouter = typeof helloRouter;
