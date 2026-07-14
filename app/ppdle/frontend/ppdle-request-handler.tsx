'use server';
import { getServerTime } from '../../utilities/getDateTime';
import {getMoveData, getMoveNameList, pullDailyMove} from '../backend/ppdle-data-grabber';
import {getMoveResults} from '../backend/ppdle-results-verifier';
import PPdleInputHandler from './ppdle-input-handler';
import { revalidatePath } from 'next/cache';

const moveList = await getMoveData();

const [daily] = await pullDailyMove();

const serverDateString = (await getServerTime()).slice(0,10);


var results : Array<{success: boolean, data}> = [];

async function processGuess(formData: FormData){
    'use server';
    const guessName = formData.get('input-bar');
    const guess = moveList.find(move => move.name === guessName);
    const comparisonResults = await getMoveResults(guess, daily);
    const newArray = [...results, comparisonResults];
    results = newArray;
    return Promise.all(results);
}

export default async function PPldeRequestHandler(){

    const nameList: string[] = await getMoveNameList();

    return(
        <div>
            <PPdleInputHandler wordList={nameList} submitFunction={processGuess} serverDateString={serverDateString}/>
        </div>
    )
}