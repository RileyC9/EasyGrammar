import React from "react";


const Definition = (props) => {
// const definitions = prop.definition
    let id = 0;   
    const defList = [];
    props.definition.forEach(element => element.meanings.forEach((set) => set.definitions.forEach(definition => {
        defList.push(<li key={id++}>{definition.definition}</li>);
        console.log(definition.definition);
    }
    )));
return (
    <div>
        <ul>
            {defList}
        </ul>
    </div>
)}
                    
export default Definition; 
                            