import type { Config } from 'drizzle-kit';

import { env } from './env';

export default {
  schema: './src/schema/index.ts',
  dialect: 'postgresql',
  out: './migrations',
  casing: 'snake_case',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
