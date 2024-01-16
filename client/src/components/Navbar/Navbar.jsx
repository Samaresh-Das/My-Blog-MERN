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
      } mt-[36px] flex flex-row  justify-around mb-[27px]
      md:block md:mx-[100px]`}
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
      <div className="md:flex md:flex-row md:justify-between ">
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
        <ul className="md:flex md:flex-row hidden md:space-x-10 patrick-hand text-white my-auto justify">
          <li className="cursor-pointer">Front-End</li>
          <li className="cursor-pointer">Back-End</li>
          <li className="cursor-pointer">Database</li>
          <li className="cursor-pointer">DevOPS</li>
          <li className="cursor-pointer">DSA</li>
        </ul>
        <div className="hidden md:flex md:flex-row md:space-x-5 text-white">
          {!auth.isLoggedIn && (
            <Link to="/auth">
              <button>Sign Up</button>
            </Link>
          )}
        </div>
        <div className="hidden md:block relative">
          <input
            type="text"
            className="rounded-full bg-[#1F2937] pl-[40px] pb-1 text-white h-[40px] w-[400px]"
            placeholder="search"
          />
          <span className="absolute top-3 left-0 flex items-center pl-3">
            <FiSearch className="text-white opacity-50" />
          </span>
        </div>
        {auth.isLoggedIn && (
          <Link to="/create" className="my-auto">
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
        )}
        {auth.isLoggedIn && (
          <div className="hidden md:block">
            <Link to="/profile">
              <img
                className="w-[51px] h-[51px] rounded-full mr-3 object-cover relative"
                src={userPhoto}
                alt="Avatar of Jonathan Reinink"
                onMouseEnter={showMenuDropdown}
                onMouseLeave={hideMenuDropdown}
              />
            </Link>
            {showDropdown && (
              <div
                onMouseEnter={showMenuDropdown}
                onMouseLeave={hideMenuDropdown}
                id="dropdownHover"
                className=" absolute right-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/create"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Create Post
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
