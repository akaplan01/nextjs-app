'use server';

import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import { movesTable } from '../../../src/db/schema';
import { dailyRandom } from '../../../src/db/schema';
import { eq, sql, asc, OrderBy, notInArray} from 'drizzle-orm';


const db = drizzle(process.env.DATABASE_URL!);

export async function generatePPdleDaily(){
    const today = new Date().toISOString().slice(0, 10);

    try{
        const subquery = db.$with('subquery').as(db
        .select({
            data: movesTable.id
        })
        .from(movesTable)
        .where(
            notInArray(
                movesTable.id,
                db.select({id: dailyRandom.answerid}).from(dailyRandom)
            )
        )
        .orderBy(sql`RANDOM()`)
        .limit(1)
        );

        const result = await db.insert(dailyRandom).select(subquery);

        if (result === undefined){
            throw Error("Failed to add new daily answer.");
        }

        return {success: true, data: result};

    }
    catch (e){
        return {success: false, data: e.message};
    }

}

generatePPdleDaily().then(data => console.log(data.data));
