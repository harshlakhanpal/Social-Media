import React from "react";
import Loading from "../assets/img/loader.gif";
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={Loading} />
      </div>
    </div>
  );
};

export default Loader;
