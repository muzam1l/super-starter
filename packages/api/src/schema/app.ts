import { sql } from 'drizzle-orm';
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { tablePrefix } from '../tables';
import { users } from './auth';

/**
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgAppTable = pgTableCreator(tablePrefix('app'));

export const posts = pgAppTable(
  'post',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    createdById: varchar('createdById', { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updatedAt'),
  },
  example => ({
    createdByIdIdx: index('createdById_idx').on(example.createdById),
    nameIndex: index('name_idx').on(example.name),
  }),
);
