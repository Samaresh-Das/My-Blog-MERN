import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="h-full pb-[60px]">
      <div className="md:w-[600px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 mx-auto mt-[50px]">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          {props.heading}
        </p>
        <div className="flex justify-center">
          <Link
            to="/create"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {props.children}
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
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
