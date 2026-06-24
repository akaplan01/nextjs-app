'use server';
import {getMoveData, getMoveNameList, pullDailyMove} from '../backend/ppdle-data-grabber';
import {getMoveResults} from '../backend/ppdle-results-verifier';
import PPdleResultsDisplay from './ppdle-results-display';
import InputBar from './inputbar';
import { revalidatePath } from 'next/cache';

const moveList = await getMoveData();

const daily = await pullDailyMove();

var results : Array<{success: boolean, data}> = [];

async function processGuess(formData: FormData){
    'use server';
    const guessName = formData.get("input-bar");
    const guess = moveList.find(move => move.name === guessName);
    const comparisonResults = await getMoveResults(guess, daily);
    const newArray = [...results, comparisonResults];
    results = newArray;
    console.log(results);
}

export default async function PPldeRequestHandler(){
    
    const dayNumber : number = 5;

    const nameList: string[] = await getMoveNameList();

    return(
        <div>
            <InputBar wordList={nameList} submitFunction={processGuess}/>
            <PPdleResultsDisplay resultsArray={results} />
        </div>
    )
}