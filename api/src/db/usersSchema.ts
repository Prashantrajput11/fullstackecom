import {
	integer,
	pgTable,
	varchar,
	text,
	boolean,
	doublePrecision,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	role: varchar({ length: 255 }).notNull().default("user"),
	name: varchar({ length: 255 }),
	address: text(),
});
