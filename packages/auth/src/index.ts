import { DrizzleAdapter } from '@auth/drizzle-adapter';
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import DiscordProvider from 'next-auth/providers/discord';
import GitHubProvider from 'next-auth/providers/github';

import { env } from './env';
import { cache } from 'react';

import { db } from '@{workspace}/api/db';
import { pgAuthTable } from '@{workspace}/api/schema/auth';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      console.log({ session });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  adapter: DrizzleAdapter(db, pgAuthTable) as Adapter,
  session: { strategy: 'jwt' },
  providers: [
    GitHubProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    DiscordProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ! Note: allowDangerousEmailAccountLinking is set case by case basis only.
     * It must only be allowed for providers providing email which is verified.
     *
     * ...add more providers here.
     * @see https://next-auth.js.org/providers
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */

export const getAuthSession = cache(() => getServerSession(authOptions));
