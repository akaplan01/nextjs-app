'use server';
import {getMoveNameList} from './ppdle-data-grabber';
import InputBar from '../inputbar';


export default async function PPldeRequestHandler(){

    const nameList: string[] = await getMoveNameList();

    return(
        <InputBar wordList={nameList}/>
    )

}