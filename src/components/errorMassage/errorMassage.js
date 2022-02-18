import React from "react";

import error from "../../resources/img/error.gif";
const ErrorMassage = () => {
  return (
    <img
      src={error}
      style={{
        display: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "0 auto",
      }}
    ></img>
  );
};

export default ErrorMassage;
