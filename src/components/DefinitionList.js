import React from "react";


const Definition = (props) => {
    // generate unique id for every rendered element
    let id = 0;   
    // Going through the dictionary API to get only one definition
    const defList = [];
    props.definition.slice(0,1).forEach(element => element.meanings.forEach((set) => set.definitions.slice(0,1).forEach(definition => {
    defList.push(
        // Yujie, Here generates html elements for every definition
        <li key={id++}>{definition.definition}</li>
        );
    })));

    // Going through the dictionary API to get only one phonetic audio
    const speechList = [];
    props.definition.slice(0,1).forEach(element => element.phonetics.slice(0,1).forEach((phonetic)=> {
        speechList.push(
            // Yujie, Here generates html elements for every audio
            <li key={id++}><audio src={phonetic.audio} controls/> </li>
        );
        
    }));

    return (
        <div>
            {/* Yujie, here displays the definition. setup the wrapper if needed */}
            <ul>
                {defList}
            </ul>
            {/* Yujie, here displays the phonetic audio. setup the wrapper if needed */}
            <ul>
                {speechList}
            </ul>
        </div>
)}

export default Definition; 