'use client';

import "../../styles/ppdlestyle.css";
import {useActionState, useState, startTransition, useRef, useEffect} from 'react';
import { generateResultJSX } from "./ppdle-results-display";


export default function PPdleInputHandler({wordList, submitFunction, serverDateString}) 
{
    const [inputString, setInputString] = useState<string>('');
    const [autocompleted, setAutocompleted] = useState<string[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const dateString = new Date().toISOString().slice(0,10);
    const [lastDate, setLastDate] = useState();
    const [results, setResults] = useState();


    useEffect(() =>{
        if (lastDate == dateString){
            const previous = localStorage.getItem("guess-results");
            (previous && previous !== "undefined") ? setResults(JSON.parse(previous)) : null;
        }
    })


    useEffect(() => {
        localStorage.setItem("guess-results", JSON.stringify(results));
    }, [results]);

    useEffect(() => {
        localStorage.setItem("last-date", dateString);
    }, []);

    async function formAction(formData: FormData){
        const request = await submitFunction(formData);
        console.log(request);
        setResults(request.map((result) => generateResultJSX(result)));
        console.log(results);
    }

    //Takes (and sanitizes) a string value and then filters the list of options based on whether they start with the same values.
    function getFilteredNames(input: string){
        const sanitized = input.toLowerCase();
        const filtered = wordList.filter(name => name.toLowerCase().startsWith(sanitized));
        console.log(filtered);
        return filtered;
    }

    function updateAutocomplete(filterValue){
        const filtered = getFilteredNames(filterValue);
        setAutocompleted(filtered);
        return;
    }

    //Handles the input event from the input box. First sets the input string value to the most-updated option, then filters the list of move names for the autocomplete options based on the updated value.
    function handleInput(e){
        //Update input string (otherwise, the controlled object state won't update).
        const {value} = e.target;
        setInputString(value);
        console.log("Current Value", value);

        updateAutocomplete(value);
    }

    //Handles an option in the autocomplete list being clicked. Should be passed the value of the clicked item.

    return (
        <div>
            <div className="infobox">
                <h1>PPdle Prototype</h1>
                <p>Welcome to the prototype for PPdle, a daily Pokemon Move guessing game.</p>
            </div>
            <div className="input-bar-container">
                <form action={formAction} id="input-bar-form">
                    <input type="search" className="input-bar" name ="input-bar" autoComplete="off" value={inputString} placeholder="Type the name of a move!" 
                    onFocus={() => setVisible(true)} 
                    onBlur={() => setVisible(false)} 
                    onChange = {handleInput}/>
                    <button type="submit">Submit</button>
                    {visible && <ul className = "search-dropdown">
                        {autocompleted.map(
                            (result, index) => (
                                <li key={index} 
                                onMouseDown={(e) => e.preventDefault()/*Prevents Blur from triggering before onClick can complete.*/} 
                                onClick={(event) => {setInputString(result); 
                                updateAutocomplete(result);}}>
                                    {result}
                                </li>
                            )
                        )}
                    </ul>}
                </form>
            </div>
            <div className="results-container">
                <div className="table-row">
                    <div className = "table-cell">
                        <h1>Move Name</h1>
                    </div>
                    <div className = "table-cell">
                        <h1>Type</h1>
                    </div>
                    <div className = "table-cell">
                        <h1>Damage Type</h1>
                    </div>
                    <div className = "table-cell">
                        <h1>Base PP</h1>
                    </div>
                    <div className = "table-cell">
                        <h1>Power</h1>
                    </div>
                    <div className = "table-cell">
                        <h1>Accuracy</h1>
                    </div>
                    <div className = "table-cell">
                        <h1>Generation</h1>
                    </div>
                </div>
                {results}
            </div>
        </div>
    );
}