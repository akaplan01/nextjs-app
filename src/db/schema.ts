import {integer, pgTable, varchar} from "drizzle-orm/pg-core";

export const movesTable = pgTable("ppdle-moves",{
    id: integer(),
    name: varchar({length:255}).notNull(),
    type: varchar({length:255}).notNull(),
    damage_type: varchar({length:255}).notNull(),
    pp: integer().notNull(),
    power: varchar({length:255}).notNull(),
    accuracy: varchar({length:255}).notNull(),
    generation: varchar({length:255}).notNull()
});