import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const hasVisited = localStorage.getItem("hasVisited");
  const navigate = useNavigate();

  useEffect(() => {
    if (hasVisited) {
      navigate("/home");
    }
    // eslint-disable-next-line
  }, []);

  const handleSkip = () => {
    localStorage.setItem("hasVisited", "true");
    const history = window.history;
    if (history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="mt-12 mx-4 md:mx-auto">
      <h2 className="text-6xl font-bold text-gradient">Welcome.</h2>
      <button onClick={handleSkip} className="mt-6 btn-primary">
        SKIP
      </button>
    </div>
  );
}

export default Landing;
