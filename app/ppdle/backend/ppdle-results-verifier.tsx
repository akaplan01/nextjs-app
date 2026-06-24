import {typeChart} from '../frontend/typechart';

function checkTypeEffectiveness(selectedType, targetType){
    if (!Object.hasOwn(typeChart[selectedType], targetType)){
        return 1;
    }
    return typeChart[selectedType][targetType];
}

function checkPP(selectedPP, targetPP){
    if (selectedPP > targetPP){
        return "greater";
    }
    if (selectedPP < targetPP){
        return "less";
    }
    return "equal";
}

function checkDamageType(selectedDT, targetDT){
    return (selectedDT == targetDT);
}

function checkPower(selectedPower, targetPower){
    console.log(targetPower);
    const selectedAsNumber = parseInt(selectedPower);
    const targetAsNumber = parseInt(targetPower);
    if(targetPower == selectedPower){
        return "equal";
    }
    if (targetPower == 'OHKO' || targetPower == 'Variable' || targetPower == 'Non-Damaging'){
        return "cannot compare"
    }
    if (selectedPower == 'OHKO' || selectedPower == 'Variable' || selectedPower == 'Non-Damaging'){
        return "cannot compare"
    }
    if (selectedAsNumber > targetAsNumber){
        return "greater"
    }
    if (selectedAsNumber < targetAsNumber){
        return "less"
    }
}

function checkAccuracy(selectedAccuracy, targetAccuracy){
    const selectedAsNumber = parseInt(selectedAccuracy);
    const targetAsNumber = parseInt(targetAccuracy);
    if (selectedAccuracy == targetAccuracy){
        return "equal"
    }
    if (targetAccuracy == "Always Succeeds" || selectedAsNumber < targetAsNumber){
        return "less"
    }
    if (selectedAccuracy == "Always Succeeds" || selectedAsNumber > targetAsNumber){
        return "greater"
    }
}

function checkGeneration(selectedGeneration, targetGeneration){
    if (selectedGeneration == targetGeneration){
        return "equal"
    }
    if (selectedGeneration + 1 == targetGeneration || selectedGeneration - 1 == targetGeneration){
        return "close"
    }
    return "far"
}


export async function getMoveResults(selectedMove, targetMove){
    console.log(targetMove);
    console.log(selectedMove);
    var success : boolean = false;
    if (selectedMove.id == targetMove.id){
        const success = true;
    }

    const name = selectedMove.name;
    const typeComparison = (selectedMove.type == targetMove.type);
    const effectiveness = checkTypeEffectiveness(selectedMove.type, targetMove.type);
    const damageTypeComparison = checkDamageType(selectedMove.damageType, targetMove.damageType);
    const ppComparison = checkPP(selectedMove.pp, targetMove.pp);
    const powerComparison = checkPower(selectedMove.power, targetMove.power);
    const accuracyComparison = checkAccuracy(selectedMove.accuracy, targetMove.accuracy);
    const generationComparison = checkGeneration(selectedMove.generation, targetMove.generation);
    const data = {
        name: name, 
        success: success,
        
        type: selectedMove.type, 
        typeMatch: typeComparison, 
        effectiveness: effectiveness, 
        
        damageType: selectedMove.damageType, 
        damageTypeComparison: damageTypeComparison, 
        
        pp: selectedMove.pp,
        ppComparison: ppComparison,

        power: selectedMove.power,
        powerComparison: powerComparison, 
        
        accuracy: selectedMove.accuracy, 
        accuracyComparison: accuracyComparison,

        generation: selectedMove.generation,
        generationComparison: generationComparison};
    return {success: true, data: data};
}