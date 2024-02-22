import { useState } from 'react';
import axios from 'axios';
// import DefinitionList from 'DefinitionList';

// import the components in the above section

// main display goes here.
// add in the components and conditionally rendering the content to user
function Main () {
  // states declarations to store data between rendering
  const [word, setWord] = useState("");
  const [fetchData, setFetchData] = useState({});
  // When Search button is click, fetch data from free dictionary api of the word in the form.
  // Save the definition fetched into fetch data useState hook
  // or display error if word is not
  const wordSubmit = async () => {
    axios('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
    .then(response => response.json())
    .then( data => {
      setFetchData(data);
    })
    .catch(error => {
      console.error("Error fetching from the word: " + word + ".\n Error: ", error);
      setFetchData({});
    });
  }
return (
  {
    // <DefinitionList definition={fetchData} />
  }
)
}

export default Main;