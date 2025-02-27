import {
	integer,
	pgTable,
	varchar,
	text,
	boolean,
	doublePrecision,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	role: varchar({ length: 255 }).notNull().default("user"),
	name: varchar({ length: 255 }),
	address: text(),
});

export const createUserSchema = createInsertSchema(usersTable).omit({
	id: true as never, // ID DB handle karega
	role: true as never, // Default "user" hai, input nahi lena
});
export const loginSchema = createInsertSchema(usersTable).pick({
	email: true as never,
	password: true as never,
});
