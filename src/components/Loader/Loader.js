import React from "react";
import "./Loader.css";
import { BeatLoader } from "react-spinners";
//npm install react-spinners
const Loader = () => {
  return (
    <div className="loading-container">
      <BeatLoader color={"#44f22e"} loading={true} />
    </div>
  );
};

export default Loader;
