'use server';
import {getMoveNameList, pullDailyMove} from '../backend/ppdle-data-grabber';
import InputBar from '../../inputbar';


export default async function PPldeRequestHandler(){
    const dayNumber : number = 5;

    const daily = await pullDailyMove();

    const nameList: string[] = await getMoveNameList();

    return(
        <InputBar wordList={nameList}/>
    )

}