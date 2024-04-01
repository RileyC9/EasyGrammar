import React from "react";
import { Link } from "react-router-dom";
import fixPic from "../img/fixPic.jpeg";

export default function Help() {
  const handleHelp = () => {
    localStorage.removeItem("hasVisited");
  };
  return (
    <section className="block w-full">
      <div className="mt-12 mx-4 md:mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gradient">
          Your Personal
          <br />
          English Learning Assistant
        </h1>
        <div className="mx-4 mt-6 p-6 rounded-2xl bg-white shadow-md text-left flex flex-col gap-4 md:flex-row md:justify-between md:mx-auto">
          <div className="mb-4 text-gray-500 lg:text-xl dark:text-gray-400 w-full md:w-1/2">
            EasyGrammar is a tool that helps you improve your English vocabulary
            and writing skills.&nbsp;
            <Link
              to="/"
              onClick={handleHelp}
              className="text-blue-500 underline decoration-dotted text-sm"
            >
              See how it works
            </Link>
          </div>
          <div className="w-full mt-6 md:mt-0 md:w-1/2 p-2 bg-purple-50 rounded-lg relative group">
            <img src={fixPic} alt="introduction" className="rounded" />
            <div className="absolute inset-0 bg-purple-200 opacity-0 group-hover:opacity-80 transition-opacity"></div>
            <Link
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              to="/"
              onClick={handleHelp}
            >
              <div className="btn-primary">How to use?</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
