'use server';

import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import { movesTable } from '../../../src/db/schema';
import { dailyRandom } from '../../../src/db/schema';
import { eq, sql, asc } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

export async function pullRandomMove(){
    try{
        const selected = await db.select().from(movesTable).orderBy(sql`random()`).limit(1);
        
        if (selected == undefined){
            throw new Error("Failed to pull a random move. Check the database!");
        }
        
        return {success: true, data: selected};
    }
    catch (e){
        return {success: false, data: e.message};
    }

}

//dayNumber is the current day, 0-indexed.

export async function pullMoveByID({id}){
    try{
        const selected = await db.select().from(movesTable).where(eq(movesTable.id, id));

        if (selected == undefined){
            throw new Error("Move not found. Are you sure you used a valid ID?");
        }
        
        return {success: true, data: selected};
    }
    catch (e){
        return {success: false, data: e.message};
    }
}

export async function pullDailyID(){
    const today = new Date().toISOString().slice(0,10);

    try{
        const result = await db.select()
            .from(dailyRandom)
            .where(eq(dailyRandom.gameDate, today))
            .limit(1);

        if (result.length === 0) {
            throw new Error("Answer not found.");
        }

        return {success: true, data: result[0].answerid};
    }
    catch (e){
        return {success: false, data: e.message};
    }

}

async function pullMoveNames(){

    try {
        const nameList = await db.select({name: movesTable.name}).from(movesTable).orderBy(asc(movesTable.name));
        
        if (nameList[0] === undefined){
            throw new Error("Move list pull failed. Please check the database connection!");
        }

        return {success: true, data: nameList};
    }
    catch (e){
        return {success: false, data: e.message};
    }
}

export async function getMoveNameList(){
    const pulledNames = await pullMoveNames();
    if (!pulledNames.success){
        return pulledNames.data;
    }
    const nameList = pulledNames.data.map(({name: value}) => value);
    return nameList;
}

export async function pullDailyMove(){
    const idPull = await pullDailyID();
    const moveData = await pullMoveByID(idPull.data);
    return moveData.data;
}

//pullDailyID({dayNumber: 25}).then((data) => getDailyByID({dailyID: data[0].id as number})).then((data) => console.log(data[0]));
pullRandomMove().then(({success, data}) => console.log(data[0]));

getMoveNameList().then(data => console.log(data));