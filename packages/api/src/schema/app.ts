import { index, text, timestamp } from 'drizzle-orm/pg-core';
import { createTableFactory } from './helpers';
import { users } from './auth';

export const appTable = createTableFactory('app');

export const posts = appTable(
  'post',
  {
    name: text(),
    createdById: text()
      .notNull()
      .references(() => users.id),
  },
  example => [
    {
      createdByIdIdx: index().on(example.createdById),
      nameIndex: index().on(example.name),
    },
  ],
);
