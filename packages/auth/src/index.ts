import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { type DefaultSession, type NextAuthResult } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GitHubProvider from 'next-auth/providers/github';

import { env } from './env';

import { db } from '@{workspace}/api/db';
import * as authSchema from '@{workspace}/api/schema/auth';
import { cache } from 'react';

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
}

export const { handlers, auth: _auth }: NextAuthResult = NextAuth({
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
  session: { strategy: 'database' },
  adapter: DrizzleAdapter(db, {
    usersTable: authSchema.users,
    accountsTable: authSchema.accounts,
    sessionsTable: authSchema.sessions,
    verificationTokensTable: authSchema.verificationTokens,
    authenticatorsTable: authSchema.authenticators,
  }),
});

export const auth = cache(_auth);
