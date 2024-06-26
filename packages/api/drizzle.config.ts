import type { Config } from 'drizzle-kit';

import { env } from './src/env';

export default {
  schema: './src/schema/index.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
