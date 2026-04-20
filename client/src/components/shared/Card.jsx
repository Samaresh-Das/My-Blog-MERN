import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="h-full pb-[60px]">
      <div className="md:w-[600px] p-8 bg-white border-4 border-neoBorder rounded-xl shadow-neo mx-auto mt-[50px]">
        <p className="mb-6 font-bold text-neoBorder text-center text-[18px]">
          {props.heading}
        </p>
        <div className="flex justify-center">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[16px] font-bold text-neoBorder bg-neoYellow border-2 border-neoBorder rounded-lg shadow-neo hover:shadow-neoHover hover:-translate-y-1 transition-all focus:outline-none"
          >
            {props.children}
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;

