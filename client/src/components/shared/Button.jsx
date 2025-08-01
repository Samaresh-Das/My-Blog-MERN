import React from "react";

const Button = (props) => {
  return (
    <button
      className={`text-white bg-transparent  focus:ring-4 focus:outline-none font-medium rounded-2xl text-sm hover:shadow-md hover:shadow-purple-800/50 border-2  border-purple-900 hover:scale-110 transition delay-100 duration-100 ease-in-out  ${props.className}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
