import {integer, pgTable, varchar, serial, date, uniqueIndex} from "drizzle-orm/pg-core";

export const movesTable = pgTable("ppdle-moves",{
    id: integer().notNull().primaryKey(),
    name: varchar({length:255}).notNull(),
    type: varchar({length:255}).notNull(),
    damageType: varchar({length:255}).notNull(),
    pp: integer().notNull(),
    power: varchar({length:255}).notNull(),
    accuracy: varchar({length:255}).notNull(),
    generation: varchar({length:255}).notNull()
});

export const dailyRandom = pgTable("ppdle-daily",{
    id: serial('id').primaryKey().notNull(),
    answerid: integer('answer_id').notNull().references(() => movesTable.id, {onDelete: "cascade", onUpdate: "cascade"}),
    gameDate: date('game_date')
    
}, (table) => {
    return {
        dateIdx: uniqueIndex().on(table.gameDate)
    };
});