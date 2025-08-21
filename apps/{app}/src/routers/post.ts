import { post } from '@{workspace}/api/schema/app';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@{workspace}/api/trpc';

import { Type } from '@sinclair/typebox';
import { wrap } from '@typeschema/typebox';

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      wrap(
        Type.Object({
          title: Type.String({ minLength: 1 }),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(post).values({
        title: input.title,
        userId: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.post.findFirst({
      orderBy: (post, { desc }) => [desc(post.createdAt)],
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
