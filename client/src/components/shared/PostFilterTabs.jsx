import React from "react";

const PostFilterTabs = ({ tabs }) => {
  return (
    <div className="mt-20">
      <ul className="hidden md:flex md:flex-wrap md:space-x-6 md:gap-y-2 patrick-hand text-white my-auto justify-start pl-20">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className="cursor-pointer border-2 border-gray-300 rounded-2xl px-4 py-2 hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in-out"
          >
            {tab}
          </li>
        ))}

        {/* <li className="cursor-pointer border-2 border-gray-300 rounded-2xl px-4 py-2 hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in-out">
            Back-End
          </li>
          <li className="cursor-pointer border-2 border-gray-300 rounded-2xl px-4 py-2 hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in-out">
            Database
          </li>
          <li className="cursor-pointer border-2 border-gray-300 rounded-2xl px-4 py-2 hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in-out">
            DevOPS
          </li>
          <li className="cursor-pointer border-2 border-gray-300 rounded-2xl px-4 py-2 hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in-out">
            DSA
          </li> */}
      </ul>
    </div>
  );
};

export default PostFilterTabs;
