import React from "react";

const Input = ({ className = "", ...props }) => {
  return (
    <>
      <input {...props} className={className} />
    </>
  );
};

export default Input;
