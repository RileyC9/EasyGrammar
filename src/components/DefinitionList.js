import React, { useRef } from "react";

const Definition = (props) => {
  // get the word for display
  const word = props?.definition?.[0]?.word;
  // generate unique id for every rendered element
  let id = 0;
  // Going through the dictionary API to get only one definition
  const defList = [];

  props.definition.slice(0, 1).forEach((element) =>
    element.meanings.forEach((set) =>
      set.definitions.slice(0, 1).forEach((definition) => {
        defList.push(
          // Yujie, Here generates html elements for every definition
          <li key={id++}>{`"${definition.definition}"`}</li>
        );
      })
    )
  );

  // Going through the dictionary API to get only one phonetic audio
  // declare the phonetic text and audio source for the audio element
  let phoneticText, audioSrc;
  const audioRef = useRef(null);

  const speechList = [];
  props.definition.slice(0, 1).forEach((element) =>
    element.phonetics.slice(0, 1).forEach((phonetic) => {
      phoneticText = phonetic.text;
      audioSrc = phonetic.audio;
      speechList.push(
        // Yujie, Here generates html elements for every audio
        <li key={id++}>
          <audio src={audioSrc} ref={audioRef} style={{ display: "none" }} />
        </li>
      );
    })
  );

  const playAudio = () => {
    audioRef.current.play();
  };

  return (
    <>
      {/* Display if word is found */}
      {word && (
        <div className="my-6 py-6">
          <div className="flex flex-col mx-4 md:mx-auto md:flex-row gap-4">
            <h2 className="text-3xl font-semibold">{word}</h2>
            {phoneticText && (
              <div
                className="rounded-full bg-gray-100 mr-auto pl-6 pr-2 py-2 h-10 gap-2 flex items-center text-sm text-gray-500"
                onClick={playAudio}
              >
                {/* Here for the phonetic */}
                <span>{phoneticText}</span>
                {/* Here for playing the audio */}
                {audioSrc ? (
                  <div
                    className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-pink-500 hover:scale-105 transition-transform"
                    onClick={playAudio}
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
                  <div className="w-2 h-6" />
                )}
              </div>
            )}
          </div>
          {/* Yujie, here displays the phonetic audio. setup the wrapper if needed 
          no need to display in this case */}
          <ul>{speechList}</ul>
          {/* Yujie, here displays the definition. setup the wrapper if needed */}
          <ul className="mx-4 my-6 py-6 px-6 rounded-lg bg-gray-100 flex flex-col gap-4 md:mx-auto">
            {defList}
          </ul>
        </div>
      )}
    </>
  );
};

export default Definition;