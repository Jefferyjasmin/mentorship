import React from "react";
import spinner from "./spinner.png";

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading"
        style={{
          width: "200px",
          height: "200px",
          margin: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default Spinner;
