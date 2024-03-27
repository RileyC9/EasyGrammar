import React, { useRef, useState } from "react";
import fixPic from "./Image/fixPic.jpeg";


export default function ImageUnite() {

  //useState will be use to update the image
  const [image_url, setImage_url] = useState("");
  //using useRef to reference the emelement n the webpage set as null, having as null mean that it does not point to anything yet.
  let inputRef = useRef(null);

  // funtion that will be generated when we click on the button
  const imageGenerator = async () => {
    // this mean that if we don't add anything in the input field, it won't return anything
    if (inputRef.current.value === "") {
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
          prompt: `${inputRef.current.value}`,
          // 1 because we want only one image
          n: 1,
          size: "512x512",
        }),
      }
    );

    // return a promise, the data from the response body is stored in the variable data
    let data = await response.json();
    // // get the data property from the data object
    let data_array = data.data;
    // acceess to the first item in the array and to the url that will be show on the page
    setImage_url(data_array[0].url);
    // console.log(data);

    
  };

  return (
    <>
      {/* using a ternary operator if image_url is true we show the default image if false we show the image provided by the OpenAI api */}
      <div>
        <img src={image_url === "" ? fixPic : image_url} alt="" />
      </div>
      <p>here is the image test</p>
      <input
        type="text"
        ref={inputRef}
        placeholder="describe what you want to see"
      />
      <button
        onClick={() => {
          imageGenerator();
        }}
      >
        Generate
      </button>
    </>
  );
}
