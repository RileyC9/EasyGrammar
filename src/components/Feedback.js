import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fixPic from "../img/fixPic.jpeg";

// Please define the props for this component
export default function Feedback({ userInput, data }) {
  // Here for the spell checked text
  const [spellCheckedText, setSpellCheckedText] = useState("");
  // Here for the toggle buttons of the help section
  const [isOpen, setIsOpen] = useState(true);
  // Get the word from the data
  const word = data[0]?.error ? "" : data[0]?.word;
  // Get img url from local storage
  let image_url = fixPic;
  const imageData = localStorage.getItem(word);
  if (imageData) {
    const localJsonData = JSON.parse(imageData);
    image_url = localJsonData.image_url;
  }
  // Here for the user's input and feedback from OpenAI, please replace the following with the data from OpenAI
  const feedback = {
    score: 9,
    feedback:
      "You did a great job! Your sentence is clear and concise. However, you can improve it by using more descriptive words.",
    exampleSentence: "This is an example sentence.",
  };

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
                  "you are a helful assistant who can correct spelling, grammatical and lexical errors",
              },
              {
                role: "user",
                content: `correct the spelling,grammatical and lexical errors in this text: ${userInput}`,
              },
            ],
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1,
          }),
        }
      );

      let data2 = await response2.json();
      console.log(data2);
      let data2_array = data2.choices;
      setSpellCheckedText(data2_array[0].message.content);
    };

    AIspellCheck();
    window.scrollTo(0, 0);
  }, [userInput]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="block w-full">
      <h3>Here is the user's input:{userInput}</h3>
      <h3>Here is the spell checked text:{spellCheckedText}</h3>
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
        </div>
        <div className="mt-8">
          <h3 className="font-bold text-left text-lg lg:text-xl mb-2">
            Feedback
          </h3>

          <div className="rounded-lg border border-gray-300 bg-white shadow-md">
            <h3 className="flex items-center justify-between w-full p-4">
              <span className="font-semibold">Your Score:</span>
              <div className="w-24 btn-primary">
                {feedback.score}
                <span className="text-gray-300">&nbsp;/&nbsp;10</span>
              </div>
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
                {feedback.feedback}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Link to="/" className="btn-primary w-24">
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
            <p className="mx-4 mb-2 text-left text-gray-500 dark:text-gray-400">
              {feedback.exampleSentence}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
