import React from "react";

// takes props from main.js contains fetched data (data) and display control (display)
const SampleSentences = ({ data, display }) => {
  // Check if error exists
  const error = data?.[0]?.error;
  // generate unique id for every rendered element
  let id = 0;
  const exampleList = [];

  // get the sample sentences, definition and phonetic if no error
  if (error === undefined) {
    // Going through the dictionary API to get only one definition
    data.slice(0, 1).forEach((element) =>
      element.meanings.forEach((set) => {
        // Go through the fetched data to extract the sample sentences and push into exampleList array
        set.definitions.forEach((definition) =>
          definition.example
            ? exampleList.push(
                <li
                  key={id++}
                  className="italic text-gray-500 hover:text-gray-700"
                >
                  {`"${definition.example}"`}
                </li>
              )
            : null
        );
      })
    );
  }

  return (
    <section className="block w-full">
      {/* display the sample sentences if display control is true, no error and exampleList is not empty */}
      {display && !error && exampleList.length > 0 && (
        <div className="max-w-4xl mx-auto">
          {/* Sample sentence */}
          <ul className="mx-4 p-6 rounded-2xl bg-white shadow-md text-left flex flex-col gap-6 md:mx-auto">
            <div className="-ml-6 -mt-6 mr-auto rounded-tl-2xl rounded-br-2xl bg-purple-100">
              <h2 className="font-semibold p-4">Usage Examples</h2>
            </div>
            {exampleList}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SampleSentences;
