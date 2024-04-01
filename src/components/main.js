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
// import the components in the above section

// main display goes here.

// add in the components and conditionally rendering the content to user
function Main() {
  // states declarations to store data between rendering
  const [word, setWord] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const [definitionListDisplay, setDefinitionListDisplay] = useState(false);
  const [userInput, setUserInput] = useState("");
  //Update word useState hook, everytime userinput

  function handleWord(e) {
    setWord(e.target.value);
    if (e.target.value === "") {
      setDefinitionListDisplay(false);
    }
  }

  // When Search button is click, fetch data from free dictionary api of the word in the form.
  // Save the definition fetched into fetch data useState hook
  // or display error if word is not found
  const wordSubmit = async (e) => {
    e.preventDefault();
    // version 2 of empty input field
    // if (word === "") {
    //   setDefinitionListDisplay(false);
    // } else {
    console.log(word);
    await axios
      .get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      .then((res) => {
        setFetchData(res.data);
        setDefinitionListDisplay(true);
      })
      .catch((error) => {
        console.error(
          "Error fetching from the word: " + word + ".\n Error: ",
          error
        );
        // set error message if word not found
        setFetchData([{ error: "Word not found" }]);
        setDefinitionListDisplay(true);
      });
    // version 2 of empty input field
    // }
  };
  // re-render the page when word definition is updated
  // let result;
  useEffect(() => {
    console.log(fetchData);
  }, [fetchData]);

  // function to handle the user input in Practice component
  const handleUserInput = (input) => {
    setUserInput(input);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SearchInput
              value={word}
              handleWord={handleWord}
              wordSubmit={wordSubmit}
            />
            <DefinitionList
              definition={fetchData}
              display={definitionListDisplay}
            >
              {/* Here for AI-Generated image */}
              <ImageUnite data={fetchData} />
            </DefinitionList>
            <SampleSentences data={fetchData} display={definitionListDisplay} />
            <Contact />
          </>
        }
      />
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
