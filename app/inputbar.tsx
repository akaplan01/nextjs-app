'use client';

import "./styles/inputbarstyle.css";
import {useState} from 'react';

export default function InputBar({wordList}) {
    const [inputString, setInputString] = useState<string>('');
    const [autocompleted, setAutocompleted] = useState<string[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

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
        <div className="input-bar-container">
            <input type="search" className="input-bar" name ="input-bar" autoComplete="off" value={inputString} placeholder="Type the name of a move!" 
            onFocus={() => setVisible(true)} 
            onBlur={() => setVisible(false)} 
            onChange = {handleInput}/>
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
        </div>

    );
}