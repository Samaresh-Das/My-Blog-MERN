import React from "react";

const Button = (props) => {
  return (
    <button
      className={`bg-neoYellow text-neoBorder font-bold border-2 border-neoBorder rounded-lg text-md shadow-[4px_4px_0px_rgba(17,24,39,1)] hover:shadow-[6px_6px_0px_rgba(17,24,39,1)] hover:-translate-y-1 transition-all px-4 py-2 ${props.className}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
