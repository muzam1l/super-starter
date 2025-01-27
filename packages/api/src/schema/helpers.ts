import type { BuildColumns, BuildExtraConfigColumns } from 'drizzle-orm';
import {
  type PgColumnBuilderBase,
  type PgTableExtraConfigValue,
  type PgTableWithColumns,
  bigint,
  pgTableCreator,
  timestamp,
} from 'drizzle-orm/pg-core';
import { getPgColumnBuilders, type PgColumnsBuilders } from 'drizzle-orm/pg-core/columns/all';

export const commonColumns = {
  id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({
    maxValue: Number.MAX_SAFE_INTEGER,
  }),
  updatedAt: timestamp()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
};

type Default<T extends object, V extends object> = T & Omit<V, keyof T>;

export const createTableFactory =
  (prefix: string, sep = '__') =>
  <TTableName extends string, TColumnsMap extends Record<string, PgColumnBuilderBase>>(
    name: TTableName,
    _columns: TColumnsMap | ((columnTypes: PgColumnsBuilders) => TColumnsMap),
    extraConfig?: (
      self: BuildExtraConfigColumns<TTableName, Default<TColumnsMap, typeof commonColumns>, 'pg'>,
    ) => PgTableExtraConfigValue[],
  ): PgTableWithColumns<{
    name: TTableName;
    schema: undefined;
    columns: BuildColumns<TTableName, Default<TColumnsMap, typeof commonColumns>, 'pg'>;
    dialect: 'pg';
  }> => {
    let columnsMap: TColumnsMap;
    if (typeof _columns === 'function') {
      columnsMap = _columns(getPgColumnBuilders());
    } else {
      columnsMap = _columns;
    }

    const mergedColumns = {
      ...commonColumns,
      ...columnsMap,
    };

    return pgTableCreator((name: string) => prefix + sep + name)(name, mergedColumns, extraConfig);
  };
