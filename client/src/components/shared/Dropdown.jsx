import React, { useState } from "react";

const Dropdown = ({ dropdownList, getTag }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownDefaultName, setDropdownDefaultName] = useState("Tags");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onSelectingTag = (value) => {
    getTag(value);
    setShowDropdown(false);
    setDropdownDefaultName(value);
  };

  return (
    <div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={toggleDropdown}
      >
        {dropdownDefaultName}{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        className={`${
          showDropdown ? "block" : "hidden"
        } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 `}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {dropdownList.map((item) => (
            <li
              key={item.id}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => onSelectingTag(item.content)}
            >
              {item.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
