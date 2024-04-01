import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const hasVisited = localStorage.getItem("hasVisited");
  const navigate = useNavigate();

  if (hasVisited) {
    navigate("/home");
  }

  const handleSkip = () => {
    localStorage.setItem("hasVisited", true);
    navigate("/home");
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleSkip}>Skip</button>
    </div>
  );
}

export default Landing;
