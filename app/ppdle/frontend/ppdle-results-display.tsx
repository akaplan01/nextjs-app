'use client'

import {useEffect} from "react"
import { useState } from "react"
import { useRef } from "react"; 

const equal = 'green';
const close = 'yellow';
const wrong = 'red';

function getBoolCellColor(bool : boolean){
    return({backgroundColor: bool ? equal : wrong});
}

function getIsEqualColor(value: string){
    return({backgroundColor: (value == "equal") ? equal : wrong});
}

function getIsCloseColor(value: string){
    switch (value){
        case "equal":
            return {backgroundColor: equal};
        case "close":
            return {backgroundColor: close};
        default:
            return {backgroundColor: wrong};
    }
}

function generateResultJSX(result){

    if (result.success == true){
        //pass
    }

    const comparisonData = result.data;
    const resultJSX = (
        <div className = "table-row">
            <div className = "table-cell">{comparisonData.name}</div>
            
            <div className = "table-cell" style={getBoolCellColor(comparisonData.typeMatch)}>
                {comparisonData.type}
            </div>
            
            <div className="table-cell" style={getBoolCellColor(comparisonData.damageTypeComparison)}>
                {comparisonData.damageType}
            </div>

            <div className="table-cell" style={getIsEqualColor(comparisonData.ppComparison)}>
                {comparisonData.pp}
            </div>

            <div className="table-cell" style={getIsEqualColor(comparisonData.powerComparison)}>
                {comparisonData.power}
            </div>

            <div className="table-cell" style={getIsEqualColor(comparisonData.accuracyComparison)}>
                {comparisonData.accuracy}
            </div>

            <div className="table-cell" style={getIsCloseColor(comparisonData.generationComparison)}>
                {comparisonData.generation}
            </div>
        </div>
    )

    return resultJSX;

}


export default function PPdleResultsDisplay(resultsArray){
    const res = Array.from(resultsArray);
    console.log(res);
    return(
        <div>
            {res.map((result) => generateResultJSX(result))}
        </div>
    );
}