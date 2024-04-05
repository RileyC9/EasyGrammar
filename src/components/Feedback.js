import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fixPic from "../img/fixPic.jpeg";

// Please define the props for this component
export default function Feedback({ userInput, data }) {
  // Navigate to the home page if no user input
  const navigate = useNavigate();
  if (!userInput) {
    navigate("/home");
  }
  // Scroll to top when the page is loaded
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);
  // Here for the spell checked text
  const [responseDisplay, setResponseDisplay] = useState([]);
  // Here for the grade from the user text
  const [grade, setGrade] = useState("");
  // Here for the explanation of the user text
  const [explanation, setExplanation] = useState("");
  // Here for the toggle buttons of the help section
  const [isOpen, setIsOpen] = useState(true);
  // Get the word from the data
  const word = data[0]?.error ? "" : data[0]?.word;
  // Get img url from local storage
  let image_url = fixPic;
  let index = 0;
  const imageData = localStorage.getItem(word);
  if (imageData) {
    const localJsonData = JSON.parse(imageData);
    image_url = localJsonData.image_url;
  }
  // OpenAI API request documentation: https://platform.openai.com/examples/default-grammar?lang=curl
  // fetching data with a POST request to OpenAI
  useEffect(() => {
    const AIspellCheck = async () => {
      const response2 = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          // using POST to make a request to the server
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant who can correct spelling, grammatical, and lexical errors, and will provide a grade out of 10 based on the length, number of errors, and readability, while also explaining the changes and how to improve.",
              },
              {
                role: "user",
                content: `Corrected text: in this text:${userInput}`,
              },
            ],
            temperature: 0.7,
            max_tokens: 180,
            top_p: 1,
          }),
        }
      );
      // get the information of the corrected text
      let data2 = await response2.json();
      console.log(data2);
      let data2_array = data2.choices
        ? data2.choices
        : [
            {
              message: {
                content:
                  "Error: an error occured witht the server, please try again in few minutes.",
              },
            },
          ];
      let responseArray = data2_array[0]
        ? data2_array[0].message.content.split("\n")
        : ["error, no analysis"];
      // setSpellCheckedText(data2_array[0].message.content);

      // extract grade
      const gradeContent = data2_array[0].message.content;
      // regular expression that will match the string grade follow by a space
      const gradeRegex = /Grade:\s(\d+\/\d+)/;
      const gradeMatch = gradeContent.match(gradeRegex);
      //gradeMatch[1] is the grade value
      if (gradeMatch && gradeMatch[1]) {
        setGrade(gradeMatch[1]);
      }
      // the respond is slipt into an array and filter the information that we do not want to show.
      // setResponseDisplay(responseArray.filter(sentence => sentence.search(gradeRegex).map(sentence => <li id={index++}>{sentence}</li>)));
      setResponseDisplay(
        responseArray
          .filter((sentence) => sentence.search(gradeRegex))
          .map((sentence) => "\n" + sentence)
      );

      // console.log(responseDisplay);

      // extract explanation
      const explanationRegex = /Explanation:(.*)/s;
      const explanationMatch = gradeContent.match(explanationRegex);
      if (explanationMatch && explanationMatch[1]) {
        setExplanation(explanationMatch[1].trim());
      }
    };

    AIspellCheck();
  }, [userInput]);

  let finalDisplay = responseDisplay.map((sentence) => (
    <li key={index++}>{sentence}</li>
  ));

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="block w-full">
      <div className="mt-12 mx-4 md:mx-auto max-w-4xl">
        <div>
          <h2 className="font-bold text-xl lg:text-2xl">
            You did a great job!
          </h2>
          {/* Here for AI generated image */}
          <div className="mt-4 max-w-lg mx-auto bg-white rounded-2xl p-4">
            <img
              src={image_url || fixPic}
              alt="AI-Generated"
              className="w-full h-auto"
            />
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Your work has been evaluated by OpenAI. Here is the feedback:
          </p>
        </div>
        <div className="mt-8">
          <h3 className="font-bold text-left text-lg lg:text-xl mb-4">
            Feedback
          </h3>
          <div className="rounded-lg border border-gray-300 bg-white shadow-md">
            <h3 className="flex items-center justify-between w-full p-4">
              <span className="font-semibold">Your Score:</span>
              {grade && <div className="w-24 btn-primary">{grade}</div>}
            </h3>
            <h3>
              <button
                type="button"
                onClick={() => toggleOpen()}
                className="flex items-center justify-between w-full p-4 rtl:text-right border-t border-gray-300"
              >
                <span className="font-semibold">How to improve?</span>
                <svg
                  className={`w-3 h-3 shrink-0 ${isOpen ? "" : "rotate-180"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="#d1d5db"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h3>
            <div
              className={`p-5 border-t border-gray-300 bg-purple-50 overflow-hidden rounded-b-lg
                ${isOpen ? "" : "hidden"}`}
            >
              <p className="mx-4 mb-2 text-left text-gray-500 dark:text-gray-400">
                {explanation}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/home"
            className="btn-primary w-48 h-12 flex items-center justify-center mx-auto"
          >
            Back to Home
          </Link>
        </div>
        <div className="mt-16 rounded-lg border border-gray-300 bg-purple-100 shadow-md">
          <h3 className="flex items-center justify-between w-full p-4">
            <span className="font-semibold">Your Answer:</span>
          </h3>
          <div className="p-5 border-t border-gray-300 bg-purple-50 overflow-hidden rounded-b-lg">
            <p className="mx-4 mb-2 text-left text-gray-500 dark:text-gray-400">
              {userInput}
            </p>
          </div>
          <h3 className="flex items-center justify-between w-full p-4 border-t border-gray-300">
            <span className="font-semibold">Example Answer:</span>
          </h3>
          <div className="p-5 border-t border-gray-300 bg-purple-50 overflow-hidden rounded-b-lg">
            <ul
              key={index++}
              style={{ listStyleType: "none", padding: 1 }}
              className="mx-4 mb-2 text-left text-gray-500 dark:text-gray-400"
            >
              {finalDisplay}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
