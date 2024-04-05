import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fixPic from "../img/fixPic.jpeg";

// Please define the props for this component
export default function Practice({ onUserInput, data }) {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  // Get the word from the data
  const word = data[0]?.error ? "" : data[0]?.word;
  // Get img url from local storage
  let image_url = fixPic;
  const imageData = localStorage.getItem(word);
  if (imageData) {
    const localJsonData = JSON.parse(imageData);
    image_url = localJsonData.image_url;
  }

  // Scroll to top when the page is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    onUserInput(userInput);
    navigate("/home/feedback");
  };

  return (
    <section className="block w-full">
      <div className="mt-12 mx-4 md:mx-auto max-w-4xl">
        <div>
          <h2 className="font-bold text-xl lg:text-2xl">
            Write one or more sentences that&nbsp;
            <span className="text-gradient">describe this picture</span>
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
          <h3 className="font-bold text-left text-lg lg:text-xl mb-4">
            Your Answer:
          </h3>
          {/* Here for User input */}
          <form className="w-full" onSubmit={handleInputSubmit}>
            <div className="relative">
              <textarea
                value={userInput}
                onChange={handleInputChange}
                type="search"
                id="word-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write one or more sentences that describe the above picture."
                rows={6}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary mt-4"
              title="Submit to get feedback from OpenAI"
            >
              Check Your Answer
            </button>
          </form>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Need Help?{" "}
          <Link
            to="/home"
            className="font-semibold text-blue-500 underline decoration-dsahed hover:text-fuchsia-500"
          >
            Back to Definitions
          </Link>
        </p>
      </div>
    </section>
  );
}
