import React from "react";

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
        // Go through the fetched data to extract the sample sentences and store in exampleList
        set.definitions.forEach((definition) => 
          definition.example? exampleList.push(<li key={id++}>{`${definition.example}`}</li>):null
        );
      })
    );
  }

  return (
    <>
      {display? (error ? (
        <></>
      ) : (
        // display the word and definition if no error(
          <section className="mt-12 py-6 max-w-4xl mx-auto">
            <h2>Sample sentences:</h2>
            {/* Sample sentence */}
            {/* Yujie, please modify the Sample sentence appearance */}
            <ul className="mx-4 my-6 py-6 px-6 rounded-2xl bg-white hover:bg-purple-100 text-left flex flex-col gap-4 md:mx-auto">
              {exampleList}
            </ul>
          </section>
        )): (<></>)
      }
    </>
  );
};

export default SampleSentences;
