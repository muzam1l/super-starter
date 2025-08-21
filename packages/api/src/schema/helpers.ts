import { bigserial, pgTableCreator, timestamp } from 'drizzle-orm/pg-core';

export const commonColumns = {
  id: bigserial({ mode: 'bigint' }).primaryKey(),
  updatedAt: timestamp()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
};

const SEP = '__';
export const tableFactory = (prefix: string) => pgTableCreator(name => `${prefix}${SEP}${name}`);
