import React from "react";


const Definition = (props) => {

let id = 0;   
// Going through the dictionary API to get only one definition
    const defList = [];
    props.definition.slice(0,1).forEach(element => element.meanings.forEach((set) => set.definitions.slice(0,1).forEach(definition => {
    defList.push(<li key={id++}>{definition.definition}</li>);
        
    }
    )));

// Going through the dictionary API to get only one phonetic audio
    const speechList = [];
    props.definition.slice(0,1).forEach(element => element.phonetics.slice(0,1).forEach((phonetic)=> {
        speechList.push(<li key={id++}><audio src={phonetic.audio} controls/> </li>);
        
    }
    ));
return (
    <div>
{/* displaying the definition */}
        <ul>
            {defList}
        </ul>
{/* displaying the phonetic audio */}
        <ul>
            {speechList}
        </ul>


    </div>


)}
                    
export default Definition; 
                            