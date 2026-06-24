'use server';

import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import { movesTable } from '../../../src/db/schema';
import { dailyRandom } from '../../../src/db/schema';
import { eq, sql, asc, OrderBy, notInArray} from 'drizzle-orm';
import { ppdleDaily } from '../../../drizzle/schema';


const db = drizzle(process.env.DATABASE_URL!);

async function addGameDate(rows, initialDate){
    const date = new Date(initialDate);
    try{
        
        for (const row of rows){
        
            var dateString = date.toISOString().slice(0,10);
        
            await db.update(dailyRandom).set({gameDate: dateString}).where(eq(dailyRandom.id, row.id));
        
            //console.log(`Processed row ${row.id}`);
        
            date.setDate(date.getDate() + 1);
        }

        return {success: true, data: "Rows completed successfully!"};
    }
    catch (e){
        return {success: false, data: e.message};
    }
}



export async function generatePPdleDaily(){
    const today = new Date();
    console.log(today);
    const dateString = today.toISOString().slice(0,10);
    console.log(dateString);
    try{
        const result = await db.execute(sql`INSERT INTO public."ppdle-daily" ("answer_id") SELECT id FROM public."ppdle-moves" ORDER BY RANDOM();`);

        console.log(result);

        const rowsPull = await db.select().from(dailyRandom).orderBy(asc(dailyRandom.id));

        console.log(rowsPull);

        const dateAddResult = await addGameDate(rowsPull, today);
        console.log(dateAddResult.data);
        if (!dateAddResult.success){
            throw new Error("Failed to add dates to table.");
        }
        return {success: true, data: "Function executed successfully."};
    }
    catch (e){
        return {success: false, data: e.message};
    }

}

export async function destroyPPdleDaily(){
    try{
        const result = await db.execute(sql`TRUNCATE TABLE ${dailyRandom} RESTART IDENTITY`);
        return {success: true, data: "Successfully Cleared PPdle Daily table."};
    }
    catch (e){
        return {success: false, data: e.message};
    }
} 

//destroyPPdleDaily().then(response => console.log(response.data));
generatePPdleDaily().then(response => console.log(response.data));