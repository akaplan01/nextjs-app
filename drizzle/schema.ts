import { pgTable, integer, serial, varchar, date, uniqueIndex, foreignKey, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const ppdleDaily = pgTable("ppdle-daily", {
	id: serial().primaryKey(),
	answerId: integer("answer_id").notNull().references(() => ppdleMoves.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	gameDate: date("game_date"),
}, (table) => [
	uniqueIndex("ppdle-daily_game_date_index").using("btree", table.gameDate.asc().nullsLast()),
]);

export const ppdleMoves = pgTable("ppdle-moves", {
	id: integer().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 255 }).notNull(),
	damageType: varchar({ length: 255 }).notNull(),
	pp: integer().notNull(),
	power: varchar({ length: 255 }).notNull(),
	accuracy: varchar({ length: 255 }).notNull(),
	generation: varchar({ length: 255 }).notNull(),
});
