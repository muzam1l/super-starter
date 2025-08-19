import { posts } from '@{workspace}/api/schema/app';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@{workspace}/api/trpc';

import { Type } from '@sinclair/typebox';
import { wrap } from '@typeschema/typebox';

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(wrap(Type.Object({ text: Type.String() })))
    .query(({ input: { text } }) => {
      return {
        greeting: `Hello ${text}`,
      };
    }),

  create: protectedProcedure
    .input(
      wrap(
        Type.Object({
          name: Type.String({ minLength: 1 }),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
