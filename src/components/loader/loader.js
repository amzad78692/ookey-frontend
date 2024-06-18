import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="flex justify-center text-center">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
       <p className="text-green-400 font-medium text-md mt-2">Just a Sec!</p>
    </div>
  );
};

export default Loader;
