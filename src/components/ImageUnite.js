import React, { useState, useEffect } from "react";
import fixPic from "./Image/fixPic.jpeg";
import { Link } from "react-router-dom";

export default function ImageUnite({ data }) {
  //useState will be use to update the image
  const [image_url, setImage_url] = useState(
    localStorage.getItem("image_url") || ""
  );
  const [showGenerate, setShowGenerate] = useState(
    localStorage.getItem("showGenerate") !== "false"
  );
  const [isGenerated, setIsGenerated] = useState(
    localStorage.getItem("isGenerated") === "true"
  );

  // Check if error exists
  const error = data[0]?.error;
  // get searched word for alt attribute
  const word = error ? "Error" : data[0]?.word;
  const meanings = [];
  const examples = [];
  if (error === undefined) {
    // Going through the dictionary API to get first one definition
    data.slice(0, 1).forEach((element) =>
      element.meanings.forEach((set) => {
        set.definitions.slice(0, 1).forEach((definition) => {
          meanings.push(definition.definition);
        });
        set.definitions.forEach((definition) => {
          examples.push(definition.example);
        });
      })
    );
  }
  const meaningsStr =
    meanings.length > 0
      ? "The word can mean " + meanings.join(", ") + " and so on. "
      : "";
  const examplesStr =
    examples.length > 0
      ? "In a sentence, it could be used like " +
        examples.join(", ") +
        " and so on. "
      : "";
  const prompt = `Generate an image representing the word '${word}' along with its meanings and potential context. ${meaningsStr}${examplesStr}Create an image that encapsulates the essence of this word in a visually compelling manner.`;

  // funtion that will be generated when we click on the button
  const imageGenerator = async () => {
    // this mean that if we don't add anything in the input field, it won't return anything
    if (error || !word) {
      return 0;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        // using POST to make a request to the server
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "User-agent": "Chrome",
        },
        body: JSON.stringify({
          // this will give the text return in the input field
          prompt: prompt,
          // 1 because we want only one image
          n: 1,
          size: "512x512",
        }),
      }
    );

    // return a promise, the data from the response body is stored in the variable data
    let res = await response.json();
    // // get the data property from the data object
    let res_data = res.data;
    // acceess to the first item in the array and to the url that will be show on the page
    setImage_url(res_data[0].url);
    // console.log(data);
    if (res_data[0].url) {
      setShowGenerate(false);
      setIsGenerated(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("image_url", image_url);
    localStorage.setItem("showGenerate", showGenerate);
    localStorage.setItem("isGenerated", isGenerated);
  }, [image_url, showGenerate, isGenerated]);

  return (
    !error && (
      <>
        {/* using a ternary operator if image_url is true we show the default image if false we show the image provided by the OpenAI api */}
        <img src={image_url === "" ? fixPic : image_url} alt={word} />
        {showGenerate && (
          <>
            <div>
              Create an image of&nbsp;
              <code>{word}</code>
            </div>
            <button
              className="btn-primary"
              onClick={() => {
                imageGenerator();
              }}
            >
              Generate
            </button>
          </>
        )}
        {isGenerated && (
          <button className="btn-primary">
            <Link to="/practice">Practice</Link>
          </button>
        )}
      </>
    )
  );
}
