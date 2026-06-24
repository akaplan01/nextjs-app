import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	ppdleDaily: {
		ppdleMove: r.one.ppdleMoves({
			from: r.ppdleDaily.answerId,
			to: r.ppdleMoves.id
		}),
	},
	ppdleMoves: {
		ppdleDailies: r.many.ppdleDaily(),
	},
}))