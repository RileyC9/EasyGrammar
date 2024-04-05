import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import homepage from "../img/homepage.png";
import aiImage from "../img/aiImage.png";
import practice from "../img/practice.png";
import feedback from "../img/feedback.png";

function Landing() {
  const hasVisited = localStorage.getItem("hasVisited");
  const navigate = useNavigate();

  useEffect(() => {
    if (hasVisited) {
      navigate("/home");
    } else {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line
  }, []);

  const handleSkip = () => {
    localStorage.setItem("hasVisited", "true");
    const history = window.history;
    if (history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  const introduction = [
    {
      imageSrc: homepage,
      title: "Search for a word",
      description:
        "With EasyGrammar, you can search for an English word and get its: Pronunciation, Definition, and Usage in a sentence.",
      color: "bg-fuchsia-200",
    },
    {
      imageSrc: aiImage,
      title: "AI Generated Image",
      description:
        "You can get an AI generated image based on the word you searched.",
      color: "bg-pink-200",
    },
    {
      imageSrc: practice,
      title: "Practice",
      description:
        "Practice your writing skills by writing sentences based on a given image.",
      color: "bg-violet-200",
    },
    {
      imageSrc: feedback,
      title: "Feedback",
      description:
        "Get feedback on your writing from OpenAI. Improve your vocabulary and writing skills.",
      color: "bg-purple-200",
    },
  ];

  return (
    <section className="block w-full">
      <div className="mt-12 mx-4 md:mx-auto max-w-4xl">
        <h2 className="text-5xl font-bold text-gradient leading-normal">
          Learning is: Easy.
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gradient font-semibold">
          AI Powered. Visual Learning. Instant Feedback.
        </p>
        <p className="text-gray-700">
          Improve your vocabulary and writing skills with EasyGrammar: Enjoy and
          Grow.
        </p>
        <button
          onClick={handleSkip}
          className="mt-6 btn-primary w-48 h-12 font-semibold"
        >
          GET STARTED
        </button>
      </div>
      <div className="my-24 md:mx-auto bg-purple-100 pt-2 pb-12 rounded-2xl">
        {introduction.map((intro, index) => (
          <div
            className={`mt-12 items-center md:flex gap-12 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
            key={intro.title}
          >
            <div
              className={`py-6 h-64 md:w-1/2 overflow-hidden ${
                index % 2 === 0
                  ? "pl-6 mr-6 md:mr-0 rounded-r-full"
                  : "pr-6 ml-6 md:ml-0 rounded-l-full"
              } ${intro.color}`}
            >
              <div className="flex justify-center items-center h-full">
                <img
                  src={intro.imageSrc}
                  alt={intro.title}
                  className="h-full w-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="md:text-left md:w-1/2 p-6 text-gray-700">
              <h3 className="text-gradient font-semibold text-3xl mb-4">
                {intro.title}
              </h3>
              <p>{intro.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Contact />
    </section>
  );
}

export default Landing;
