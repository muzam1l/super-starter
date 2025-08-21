import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization } from 'better-auth/plugins/organization';
import { db } from './db';
import { env } from '../env';
import { nextCookies } from 'better-auth/next-js';
import { cache } from 'react';
import { headers } from 'next/headers';
import * as authSchema from './schema/auth';

const USER = 'auth__user';
const SESSION = 'auth__session';
const ACCOUNT = 'auth__account';
const VERIFICATION = 'auth__verification';
const ORGANIZATION = 'auth__organization';
const MEMBER = 'auth__member';
const INVITATION = 'auth__invitation';
const TEAM = 'auth__team';
const TEAM_MEMBER = 'auth__team_member';

export const auth = betterAuth({
  baseURL: env.AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      [USER]: authSchema.user,
      [SESSION]: authSchema.session,
      [ACCOUNT]: authSchema.account,
      [VERIFICATION]: authSchema.verification,
      [ORGANIZATION]: authSchema.organization,
      [MEMBER]: authSchema.member,
      [INVITATION]: authSchema.invitation,
      [TEAM]: authSchema.team,
      [TEAM_MEMBER]: authSchema.teamMember,
    },
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
  },
  plugins: [
    organization({
      teams: {
        enabled: true,
      },

      schema: {
        organization: { modelName: ORGANIZATION },
        member: { modelName: MEMBER },
        invitation: { modelName: INVITATION },
        team: { modelName: TEAM },
        teamMember: { modelName: TEAM_MEMBER },
      },
    }),
    nextCookies(),
  ],
  user: {
    modelName: USER,
  },
  session: {
    modelName: SESSION,
  },
  account: {
    modelName: ACCOUNT,
  },
  verification: {
    modelName: VERIFICATION,
  },
});

// Should be wrapped before using anywhere. Passing appropriate headers and caching.
export const authSessionFactory = async (headers: Headers) => auth.api.getSession({ headers });

export const getNextAuthSession = cache(async () => authSessionFactory(await headers()));
