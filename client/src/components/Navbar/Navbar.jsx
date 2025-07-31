import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import NavItems from "./NavItems";

import { IconContext } from "react-icons";
import { HiMenu } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { IoIosCreate } from "react-icons/io";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const hideNav = (e) => {
    setShowNavMenu(e);
  };

  const showMenuDropdown = () => {
    setShowDropdown(true);
  };
  const hideMenuDropdown = () => {
    setShowDropdown(false);
  };

  const ifNotOnHomepage = location.pathname !== "/";
  const isAuthPage = location.pathname === "/auth";

  const logoutHandler = () => {
    //if on the homepage no need to redirect.
    if (ifNotOnHomepage) {
      history.push("/");
      auth.logout();
    } else {
      auth.logout();
    }
  };

  return (
    <div
      className={`${
        isAuthPage && "md:hidden"
      } mt-[36px] flex flex-row justify-around mb-[27px] 
  md:flex md:flex-wrap md:justify-between md:items-center md:gap-y-4 md:mx-[60px]`}
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
      {/* ✅ Tablet navbar flex layout wrapper */}
      <div className="w-full md:w-full md:flex md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4">
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

        <div className="flex flex-row items-center justify-between md:justify-start md:space-x-5 my-auto">
          <div className="hidden md:block relative">
            <input
              type="text"
              className="rounded-full bg-[#1F2937] pl-[40px] pb-1 text-white h-[40px] w-full md:w-[200px] lg:w-[300px]"
              placeholder="search"
            />
            <span className="absolute top-3 left-0 flex items-center pl-3">
              <FiSearch className="text-white opacity-50" />
            </span>
          </div>
          <div className="hidden md:flex md:flex-row md:space-x-5 text-white hover:scale-105 transition-all duration-300 ease-in-out">
            {!auth.isLoggedIn && (
              <Link to="/auth">
                <button className="border border-1 border-gray-300 rounded-full py-2 px-5 bg-white/5 backdrop-blur-md hover:bg-[#5c1eae]/30 transition-all duration-300 ease-in-out">
                  Sign Up
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between md:justify-start md:space-x-5 my-auto">
          {/* {auth.isLoggedIn && (
            <Link to="/create" className="my-auto hidden md:block">
              <IconContext.Provider
                value={{
                  color: "white",
                  className: "global-class-name",
                  size: "2em",
                }}
              >
                <div>
                  <IoIosCreate className="create_post" />
                  <Tooltip anchorSelect=".create_post" place="bottom">
                    Create Post
                  </Tooltip>
                </div>
              </IconContext.Provider>
            </Link>
          )} */}

          {auth.isLoggedIn && (
            <div className="hidden md:block">
              <Link to="/profile">
                <img
                  className="w-[51px] h-[51px] rounded-full mr-3 object-cover relative"
                  src={userPhoto}
                  alt="Avatar of Jonathan Reinink"
                  onMouseEnter={showMenuDropdown}
                  onClick={hideMenuDropdown}
                />
              </Link>
              {showDropdown && (
                <div
                  onMouseEnter={showMenuDropdown}
                  onMouseLeave={hideMenuDropdown}
                  id="dropdownHover"
                  className="absolute mt-2 right-5 bg-white/5 backdrop-blur-xl divide-y rounded-2xl w-44"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownHoverButton"
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:text-[#e647ff]"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/create"
                        className="block px-4 py-2 hover:text-[#e647ff]"
                      >
                        Create Post
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 hover:text-[#e647ff]"
                      >
                        <button onClick={logoutHandler}>Logout</button>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        {/* create post icon */}
      </div>
      {/* search icon */}
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
      {showNavMenu && !isDesktop && <NavItems onHide={hideNav} />}
    </div>
  );
};

export default Navbar;
