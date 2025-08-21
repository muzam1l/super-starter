import { index, text } from 'drizzle-orm/pg-core';
import { tableFactory, commonColumns } from './helpers';
import { user } from './auth';

export const appTable = tableFactory('app');

export const post = appTable(
  'post',
  {
    ...commonColumns,
    title: text(),
    userId: text()
      .notNull()
      .references(() => user.id),
  },
  table => [index().on(table.userId)],
);
