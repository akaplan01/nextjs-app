'use client'

import {useEffect} from "react"
import { useState } from "react"
import { useRef } from "react"; 

const equal = 'green';
const close = 'yellow';
const wrong = 'red';

function getTypeMatchColor(bool: boolean){
    return ({backgroundColor: bool ? equal : "grey"});
}

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

function renderEffectivenessSymbol(effectiveness){
    switch (effectiveness) {
        case 1:
            return "\uD83D\uDD34";
        case 2:
            return "\u2B55";
        case .5:
            return "\uD83D\uDD3A";
        case 0:
            return "\u274C";
    }
}

export function generateResultJSX(result){

    const comparisonData = result.data;
    if (comparisonData.success == true){
        //pass
    }
    return(
        <div className = "table-row">
            <div className = "table-cell move-title-cell">{comparisonData.name}</div>
            
            <div className = "table-cell" style={getTypeMatchColor(comparisonData.typeMatch)}>
                <img src={`/assets/ppdle_type_icons/${comparisonData.type}_icon.png`}></img>
                <p>{renderEffectivenessSymbol(comparisonData.effectiveness)}</p>
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

            <div className="table-cell final-cell" style={getIsCloseColor(comparisonData.generationComparison)}>
                {comparisonData.generation}
            </div>
        </div>
    )


}