'use server';

import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import { movesTable } from '../../src/db/schema';
import { dailyRandom } from '../../src/db/schema';
import { eq, sql, asc } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

export async function pullRandom(){
    const selected = db.select().from(movesTable).orderBy(sql`random()`).limit(1);
    return selected;
}

//dayNumber is the current day, 0-indexed.
async function pullDailyID({dayNumber}){
    const id = db.select({id: dailyRandom.id}).from(dailyRandom).where(eq(dailyRandom.day, dayNumber+1));
    return id;
}

export async function getDailyByID({dailyID}){
    const moveData = db.select().from(movesTable).where(eq(movesTable.id, dailyID));
    return moveData;
}

async function pullMoveNames(){
    const nameList = db.select({name: movesTable.name}).from(movesTable).orderBy(asc(movesTable.name));
    return nameList;
}

export async function getMoveNameList(){
    const pulledNames = await pullMoveNames();
    const nameList = pulledNames.map(({name: value}) => value);
    return nameList;
}

//pullDailyID({dayNumber: 25}).then((data) => getDailyByID({dailyID: data[0].id as number})).then((data) => console.log(data[0]));
pullRandom().then((data) => console.log(data[0]));

getMoveNameList().then(data => console.log(data));