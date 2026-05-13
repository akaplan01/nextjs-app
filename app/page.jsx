'use client';

import {useState} from 'react';
import LikeButton from './likebutton';
import InputBar from './inputbar';

function Header({title}) {
    return (<h1>{title ? title : 'No title specified!'}</h1>);
}

export default function HomePage() {
    const moveNames = ["Cut", "Tackle", "Growl", "Tail Whip", "False Swipe"];
    return (
        <div>
            <Header title="PPdle prototype" />
            <InputBar wordList={moveNames}/>
        </div>
    );
}