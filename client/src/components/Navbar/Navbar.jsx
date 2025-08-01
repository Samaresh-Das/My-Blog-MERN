import { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import NavItems from "./NavItems";

import { IconContext } from "react-icons";
import { HiMenu } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { IoIosCreate } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import ProfileFunctionalities from "./ProfileFunctionalities";
import { use } from "react";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTimeout = useRef(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false); // for mobile search toggle

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

  // Hide nav menu when navigating to a new page
  useEffect(() => {
    setShowDropdown(false);
  }, [location.pathname]);

  //to keep the dropdown hidden when user is logged in
  // This effect runs when the auth state changes
  useEffect(() => {
    if (auth.isLoggedIn) {
      setShowDropdown(false); // Hide nav menu when user is logged in
    }
  }, [auth.isLoggedIn]);

  // Toggle mobile search input
  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
  };

  const userPhoto = localStorage.getItem("userPhoto");

  const showNavMenuHandler = () => {
    setShowNavMenu(!showNavMenu);
  };

  const hideNav = (e) => {
    setShowNavMenu(e);
  };

  const showMenuDropdown = () => {
    clearTimeout(dropdownTimeout.current);
    setShowDropdown(true);
  };
  const hideMenuDropdown = () => {
    dropdownTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // You can adjust this delay (ms)
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
      <div className="opacity-40 md:hidden ml-5 mr-2">
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
            {/* <h1 className="py-[6px] px-[12px] bg-[#4B5563] logo-box  text-white source-sans__pro text-[18px]">
              S
            </h1> */}
            <div>
              <img
                src="/Assets/blog.png"
                alt="Logo"
                className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] object-cover my-auto"
              />
            </div>
            <h1 className="patrick-hand text-white text-[18px] pl-[11px] my-auto md:pt-3">
              Sam's Blog
            </h1>
          </div>
        </Link>

        <div className="flex flex-row items-center justify-between md:justify-start md:space-x-5 my-auto">
          {!auth.isLoggedIn && (
            <div className="hidden md:block relative">
              <input
                type="text"
                className="rounded-full pl-[40px] pb-1 text-white h-[40px] w-full md:w-[200px] lg:w-[300px] bg-transparent border border-1 border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 focus:shadow-md focus:shadow-purple-900"
                placeholder="search"
              />
              <span className="absolute top-3 left-0 flex items-center pl-3">
                <FiSearch className="text-white opacity-50" />
              </span>
            </div>
          )}
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

        {/* create post icon */}
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
          <div className="hidden md:flex md:flex-row md:items-center md:space-x-5">
            {/* Search Input */}
            <div className="hidden md:block relative">
              <input
                type="text"
                className="rounded-full pl-[40px] pb-1 text-white h-[40px] w-full md:w-[200px] lg:w-[300px] bg-transparent border border-1 border-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-900 focus:shadow-md focus:shadow-purple-900"
                placeholder="search"
              />
              <span className="absolute top-3 left-0 flex items-center pl-3">
                <FiSearch className="text-white opacity-50" />
              </span>
            </div>

            <ProfileFunctionalities
              showDropdown={showDropdown}
              showMenuDropdown={showMenuDropdown}
              hideMenuDropdown={hideMenuDropdown}
              logoutHandler={logoutHandler}
              userPhoto={userPhoto}
            />
          </div>
        )}
      </div>
      {/* search icon */}
      <div className="my-auto opacity-40 md:hidden mr-5">
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "2em",
          }}
        >
          <div onClick={toggleMobileSearch} className="cursor-pointer">
            <FiSearch />
          </div>
        </IconContext.Provider>
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              key="mobileSearch"
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full px-5 md:hidden mt-2 absolute top-20 left-0  backdrop-blur-xl rounded-lg "
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-[40px] pl-4 pr-4 rounded-full bg-white/10 text-white/100 border border-purple-900 placeholder:text-white/60 outline-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!isDesktop && showNavMenu && (
          <NavItems key="mobileSheet" onHide={hideNav} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
