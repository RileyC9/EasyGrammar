import React from "react";
import { Link } from "react-router-dom";
import Contact from "./Contact";
import Help from "./Help";
import ravinesh from "../img/ravinesh.jpg";
import riley from "../img/riley.jpg";
import xavier from "../img/xavier.jpg";
import yujie from "../img/yujie.jpg";
import { FaGithub } from "react-icons/fa";

export default function About() {
  const teamMembers = [
    {
      name: "Ravinesh",
      role: "QA Engineer",
      profile: ravinesh,
      github: "https://github.com/rsami00",
    },
    {
      name: "Riley",
      role: "Project Manager",
      profile: riley,
      github: "https://github.com/RileyC9",
    },
    {
      name: "Xavier",
      role: "Developer",
      profile: xavier,
      github: "https://github.com/Xav92",
    },
    {
      name: "Yujie",
      role: "UI/UX Developer",
      profile: yujie,
      github: "https://github.com/Peng-Yujie",
    },
  ];
  return (
    <>
      <Help />
      <Link
        to="https://github.com/RileyC9/EasyGrammar"
        className="btn-primary w-64 h-12 flex items-center justify-center mt-12 mx-auto"
      >
        <FaGithub className="mr-2 h-6 w-6" />
        <p className="font-semibold text-base">View on GitHub</p>
      </Link>
      <section className="block w-full">
        <div className="mt-12 mx-4 md:mx-auto max-w-4xl">
          <h1 className="mt-12 text-3xl font-bold text-gradient">
            Meet The Team
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mx-4 md:mx-auto">
            {teamMembers.map((member) => (
              <div
                className="p-4 text-left bg-purple-100 rounded-lg shadow-md flex flex-col gap-4 justify-between"
                key={member.name}
              >
                <img
                  src={member.profile}
                  alt={member.name}
                  className="object-cover rounded-t w-full h-full justify-self-center align-self-center"
                />
                <div className="h-[6rem]">
                  <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
                    {member.name}
                    <Link
                      to={member.github}
                      className="h-7 w-7 ml-2 bg-white hover:bg-fuchsia-300 hover:text-white rounded-full flex justify-center items-center"
                    >
                      <FaGithub className="h-4 w-4" title="GitHub" />
                    </Link>
                  </h2>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
