import React, { useState, useEffect, useContext } from "react";
import { IconContext } from "react-icons";
import { HiMenu } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import { AuthContext } from "../context/auth-context";

const Navbar = (props) => {
  const auth = useContext(AuthContext);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Set breakpoint value for desktop/mobile
    };
    window.addEventListener("resize", handleResize);

    // Call handleResize on initial load
    handleResize();

    // Cleanup listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userPhoto = localStorage.getItem("userPhoto");

  const showNavMenuHandler = () => {
    setShowNavMenu(!showNavMenu);
  };

  return (
    <div
      className="mt-[36px] flex flex-row  justify-around mb-[27px]
      md:block md:mx-[100px]"
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
          {!auth.isLoggedIn && (
            <Link to="/auth">
              <button>Sign Up</button>
            </Link>
          )}
          {auth.isLoggedIn && <Link to="/create">Create Post</Link>}
          {auth.isLoggedIn && (
            <li>
              <button onClick={auth.logout}>Logout</button>
            </li>
          )}
        </ul>
        <div className="hidden md:block relative">
          <input
            type="text"
            className="rounded-full bg-[#1F2937] pl-[40px] pb-1 text-white h-[40px]"
            placeholder="search"
          />
          <span className="absolute top-3 left-0 flex items-center pl-3">
            <FiSearch className="text-white opacity-50" />
          </span>
        </div>
        {auth.isLoggedIn && (
          <div className="hidden md:block">
            <Link to="/profile">
              <img
                className="w-[61px] h-[61px] rounded-full mr-3"
                src={userPhoto}
                alt="Avatar of Jonathan Reinink"
              />
            </Link>
          </div>
        )}
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
      {showNavMenu && !isDesktop && <NavItems />}
    </div>
  );
};

export default Navbar;
