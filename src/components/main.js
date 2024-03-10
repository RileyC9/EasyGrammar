import { useState, useEffect } from "react";
import axios from "axios";
import DefinitionList from "./DefinitionList";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Contact from "./Contact.js";
import SearchInput from "./SearchInput.js";
// import the components in the above section

// main display goes here.

// add in the components and conditionally rendering the content to user
function Main() {
  // states declarations to store data between rendering
  const [word, setWord] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const [wordFound, setWordFound] = useState();
  const [result, setResult] = useState();
  //Update word useState hook, everytime userinput

  function handleWord(e) {
    setWord(e.target.value);
  }
  // When Search button is click, fetch data from free dictionary api of the word in the form.
  // Save the definition fetched into fetch data useState hook
  // or display error if word is not

  const wordSubmit = async (e) => {
    e.preventDefault();
    console.log(word);
    await axios
      .get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      .then((res) => {
        if (res.data) {
          console.log("hi");
          setWordFound(true);
          setFetchData(res.data);
        } else {
          setWordFound(false);
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching from the word: " + word + ".\n Error: ",
          error
        );
        setWordFound(false);
        setFetchData({});
      });
  };
  // re-render the page when word definition is updated
  // let result;
  useEffect(() => {
    console.log(fetchData);
    if (wordFound) {
      setResult(<DefinitionList definition={fetchData} />);
    } else if (wordFound === false) {
      setResult(<p>Word not found.</p>);
    }
  }, [fetchData, wordFound]);

  return (
    <>
      <Header />
      {/* <input onChange={handleWord} val={word} />
      <button onClick={wordSubmit}>click here</button> */}
      <SearchInput
        value={word}
        handleWord={handleWord}
        wordSubmit={wordSubmit}
      />
      {/* <DefinitionList definition={fetchData} /> */}
      {result}
      <Contact />
      <Footer />
    </>
  );
}

export default Main;
