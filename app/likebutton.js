'use client';

import {useState} from 'react';

export default function LikeButton(){
    const [likes, setLikes] = useState(0);
    function handleClick(){
        setLikes(likes + 1);
    }

    return <button className="bg-sky-500 hover:bg-sky-700" onClick = {handleClick}>Like {likes}</button>

}