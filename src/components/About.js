import React from "react";
import Contact from "./Contact";

export default function Intro() {
  return (
    <>
      <div className="mt-12">
        <h1 className="text-3xl font-bold text-gradient">
          Your Personal
          <br />
          English Learning Assistant
        </h1>
        <p className="mb-4 text-gray-500 lg:text-lg dark:text-gray-400">
          Your Personal English Learning Assistant
        </p>
        <div className="max-w-xl mx-auto relative group">
          <img src="/intro.png" alt="introduction" />
          <div className="absolute inset-0 bg-purple-200 opacity-0 group-hover:opacity-80 transition-opacity"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="btn-primary">How to use?</button>
          </div>
        </div>
      </div>
      <div></div>
      <Contact />
    </>
  );
}
