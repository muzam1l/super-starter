// 'use server';

// import { wrap } from '@typeschema/typebox';
// import { Type } from '@sinclair/typebox';
// import { protectedServerAction } from '@{workspace}/api/trpc';
// import { posts } from '@{workspace}/api/index';

// export const createPost = protectedServerAction
//   .input(
//     wrap(
//       Type.Object({
//         name: Type.String({ minLength: 1 }),
//       }),
//     ),
//   )
//   .mutation(async ({ ctx, input }) => {
//     console.log('createPost', {
//       input,
//       ctx,
//     });
//     await ctx.db.insert(posts).values({
//       name: input.name,
//       createdById: ctx.session.user.id,
//     });
//   })
