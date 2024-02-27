import React from "react";


const Definition = (props) => {

let id = 0;   
    const defList = [];
    props.definition.slice(0,1).forEach(element => element.meanings.forEach((set) => set.definitions.slice(0,1).forEach(definition => {
    defList.push(<li key={id++}>{definition.definition}</li>);
        
    }
    )));

    const speechList = [];
    props.definition.slice(0,1).forEach(element => element.phonetics.slice(0,1).forEach((phonetic)=> {
        speechList.push(<li key={id++}><audio src={phonetic.audio} controls/> </li>);
        
    }
    ));
return (
    <div>
        <ul>
            {defList}
        </ul>
        <ul>
            {speechList}
        </ul>


    </div>


)}
                    
export default Definition; 
                            