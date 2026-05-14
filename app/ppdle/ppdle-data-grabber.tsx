import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import { movesTable } from '../../src/db/schema';
import { dailyRandom } from '../../src/db/schema';
import { eq, sql } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function pullRandom(){
    const selected = db.select().from(movesTable).orderBy(sql`random()`).limit(1);
    return selected;
}

//dayNumber is the current day, 0-indexed.
async function pullDailyID({dayNumber}){
    const id = db.select({id: dailyRandom.id}).from(dailyRandom).where(eq(dailyRandom.day, dayNumber+1));
    return id;
}

async function getDailyByID({dailyID}){
    const moveData = db.select().from(movesTable).where(eq(movesTable.id, dailyID));
    return moveData;
}

//pullDailyID({dayNumber: 25}).then((data) => getDailyByID({dailyID: data[0].id as number})).then((data) => console.log(data[0]));
pullRandom().then((data) => console.log(data[0]));