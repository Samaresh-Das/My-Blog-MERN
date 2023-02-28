import React, { useState } from "react";
import { IconContext } from "react-icons";
import { HiMenu } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import NavItems from "./NavItems";

const Navbar = (props) => {
  const [showNavMenu, setShowNavMenu] = useState(false);

  const showNavMenuHandler = () => {
    setShowNavMenu(!showNavMenu);
  };

  return (
    <div
      className="mt-[36px] flex flex-row  justify-around mb-[27px]
      md:block md:mx-[200px]"
    >
      <div className="opacity-40 md:hidden">
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "2.5em",
          }}
        >
          <div>
            <HiMenu onClick={showNavMenuHandler} />
          </div>
        </IconContext.Provider>
      </div>
      <div className="md:flex md:fle-row md:justify-between">
        <Link to="/">
          <div className="flex flex-row h-[40px]">
            <h1 className="py-[6px] px-[12px] bg-[#4B5563] logo-box  text-white source-sans__pro text-[18px]">
              S
            </h1>
            <h1 className="patrick-hand text-white text-[18px] pl-[11px] my-auto">
              Sam's Blog
            </h1>
          </div>
        </Link>
        <ul className="md:flex md:flex-row hidden md:space-x-20 patrick-hand text-white">
          <li>UI Design</li>
          <li>Front-End</li>
          <li>Back-End</li>
          <li>
            <button>Logout</button>
          </li>
          <Link to="/create">Create Post</Link>
        </ul>
        <div className="hidden md:block relative">
          <input
            type="text"
            className="rounded-full bg-[#1F2937] pl-[40px] pb-1 text-white h-[40px]"
            placeholder="search"
          />
          <span className="absolute inset-y-1 left-0 flex items-center pl-3">
            <FiSearch className="text-white opacity-50" />
          </span>
        </div>
      </div>
      <div className="my-auto opacity-40 md:hidden">
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "2em",
          }}
        >
          <div>
            <FiSearch />
          </div>
        </IconContext.Provider>
      </div>
      {showNavMenu && <NavItems />}
    </div>
  );
};

export default Navbar;
