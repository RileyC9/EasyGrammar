import React, { useRef } from "react";

/* takes props from main.js, containing fetched data (definitions), display (display control of this component), and AI generated image (children) 
*/
const DefinitionList = ({ definition, display, children }) => {
  // Store error message. If there is no error, it will be undefined
  const error = definition?.[0]?.error;
  // Store searched word. If there is error, it will be undefined
  const word = definition?.[0]?.word;
  // Generate unique id for every rendered element
  let id = 0;
  const defList = [];
  // Declare the phonetic text and audio source for the audio element
  let phoneticText, audioSrc;
  const speechList = [];

  const audioRef = useRef(null);
  // Play the word pronunciation 
  const playAudio = () => {
    audioRef.current.play();
  };

  // Store the definition and phonetic if no error into their array respectively. Will not run if there is an error on the fetched data
  if (error === undefined) {
    // Going through the fetched data (definition) to get only one set of definition
    definition.slice(0, 1).forEach((element) =>
      element.meanings.forEach((set) =>
        set.definitions.slice(0, 1).forEach((definition) => {
          defList.push(
            <li key={id++}>{`"${definition.definition}"`}</li>
          );
        })
      )
    );
    // Store the phonetic text
    phoneticText = definition[0]?.phonetics.find(
      (phonetic) => phonetic.text
    )?.text;
    // Find if there is audio and text for the phonetic
    const phoneticWithAudio = definition[0]?.phonetics.find(
      (phonetic) => phonetic.audio && phonetic.text
    );
    // 1. if audio and text exist, get the audio and update the text
    if (phoneticWithAudio) {
      phoneticText = phoneticWithAudio.text;
      audioSrc = phoneticWithAudio.audio;
    } else {
      // 2. if only audio exist, get the audio
      const phoneticAudio = definition[0]?.phonetics.find(
        (phonetic) => phonetic.audio
      );
      if (phoneticAudio) {
        audioSrc = phoneticAudio.audio;
      }
    }
    // if there is a audio source, push the JSX in the speechList array
    if (audioSrc) {
      speechList.push(
        // Here generates html elements for every audio
        <li key={id++}>
          <audio
            id="phonetic-audio"
            src={audioSrc}
            ref={audioRef}
            style={{ display: "none" }}
          />
        </li>
      );
    }
  }

  return (
    <section className="block w-full">
      {/* If display control is true and error is true, Show the error message */}
      {display ? (
        error ? (
          <div className="mt-12 py-6 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-gray-300">
              No results found, please check your spelling
            </h2>
          </div>
        ) : (
          // If display control is true, there is no error and word is defined, show the definition list, audio button, and AI generated Image component
          word && (
            // Definition list titled with the searched word
            <div className="mt-12 py-6 max-w-4xl mx-auto">
              <div className="flex flex-col mx-4 md:mx-auto md:flex-row gap-4">
                <h2 className="text-3xl font-semibold text-left">{word}</h2>
                {/* if phoneticText exist, show phonetic text and audio button */}
                {phoneticText && (
                  <div
                    id="phonetic-wrapper"
                    className="rounded-full bg-white hover:bg-purple-100 mr-auto pl-6 pr-2 py-2 h-10 gap-2 flex items-center text-sm text-gray-500"
                  >
                    {/* Phonetic text */}
                    <span id="phonetic-text">{phoneticText}</span>
                    {/* Word pronunciation audio button */}
                    {audioSrc ? (
                      <div
                        id="audio-button"
                        className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-pink-500 hover:scale-105 transition-transform"
                        onClick={playAudio}
                        data-testid="audio-button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#fff"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                          />
                        </svg>
                      </div>
                    ) : (
                      // if there is no no audio source, show an empty div
                      <div className="w-2 h-6" />
                    )}
                  </div>
                )}
              </div>
              <ul>{speechList}</ul>
              {/* Definition List */}
              <div className="mx-4 mt-6 p-6 rounded-2xl bg-white shadow-md text-left flex flex-col gap-6 md:mx-auto">
                <div className="-ml-6 -mt-6 mr-auto rounded-tl-2xl rounded-br-2xl bg-purple-100">
                  <h2 className="font-semibold p-4">Meanings</h2>
                </div>
                <div className="md:flex block justify-between">
                  <ul className="flex flex-col gap-6 w-full md:w-1/2">
                    {defList}
                  </ul>
                  <div className="w-full mt-6 md:mt-0 md:w-1/2 p-4 bg-purple-50 rounded-lg flex flex-col gap-2 items-center">
                    {/* ImageUnite component is passed to DefinitionList component as children */}
                    {children}
                  </div>
                </div>
              </div>
            </div>
          )
        )
      ) : (
        // if display control is false, show the following message
        <div className="mt-12 py-6 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-gray-300">
            Please enter a word and click Search to view the definition and
            image of the word.
          </h2>
        </div>
      )}
    </section>
  );
};

export default DefinitionList;
