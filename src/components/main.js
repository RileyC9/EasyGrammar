import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import SampleSentences from "./SampleSentence.js";
import DefinitionList from "./DefinitionList";
import Contact from "./Contact.js";
import SearchInput from "./SearchInput.js";
import ImageUnite from "./ImageUnite.js";
import Practice from "./Practice.js";
import Feedback from "./Feedback.js";
import Help from "./Help.js";
// import the components in the above section

/* main display goes here. 
Fetch data from Free Dictionary API and store the needed data into fetchData useState hook.
Fetch response from OpenAI API to get Grammar analysis and evaluation of the user's description of the image.
Pass the response to the display component respectively.
*/

// add in the components and conditionally rendering the content to user
function Main() {
  // states declarations to store data between rendering
  const [word, setWord] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const [definitionListDisplay, setDefinitionListDisplay] = useState(false);
  const [userInput, setUserInput] = useState("");
  
  /* 
  When user input any text in the search field, the input will be stored in the word useState hook

  If the search field is empty, it will set the definition list component display to be false
  */
  function handleWord(e) {
    setWord(e.target.value);
    if (e.target.value === "") {
      setDefinitionListDisplay(false);
    }
  }

  /* 
  When Search button is click, fetch data from free dictionary api of the word in the form.
  Save the definition fetched into fetchData useState hook or display error if word is not found
  set DefinitionList component display to true
  */
  const wordSubmit = async (e) => {
    e.preventDefault();
    console.log(word);
    try {
      const response = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word);
      setFetchData(response.data);
      setDefinitionListDisplay(true);
    } catch (error) {
      // Display a customized message on console
      console.error(
        "Error fetching from the word: " + word + ".\n Error: ",
        error
      );
      // set error message if word not found
      setFetchData([{ error: "Word not found" }]);
      setDefinitionListDisplay(true);
    }
  };
  // re-render the page when word definition is updated
  useEffect(() => {
    console.log(fetchData);
  }, [fetchData]);

  // function to handle the user input in Practice component
  const handleUserInput = (input) => {
    setUserInput(input);
  };

  return (
    /* Showing different content based on the pages*/
    <Routes>
      {/* Main page */}
      {/* Search bar, definitions, sample sentences, audio button, and AI generated image */}
      <Route
        path="/"
        element={
          <>
          {/* Search bar */}
            <SearchInput
              value={word}
              handleWord={handleWord}
              wordSubmit={wordSubmit}
            />
            {/* Display the definition */}
            <DefinitionList
              definition={fetchData}
              display={definitionListDisplay}
            >
              {/* Display the AI generated image */}
              <ImageUnite data={fetchData} />
            </DefinitionList>
            {/* Display the sample sentences */}
            <SampleSentences data={fetchData} display={definitionListDisplay} />
            <Help />
            <Contact />
          </>
        }
      />
      {/* Practice page */}
      {/* Ai generated image, description text field, grammar analysis, and description evaluation */}
      <Route
        path="/practice"
        element={<Practice onUserInput={handleUserInput} data={fetchData} />}
      />
      <Route
        path="/feedback"
        element={<Feedback userInput={userInput} data={fetchData} />}
      />
    </Routes>
  );
}

export default Main;
