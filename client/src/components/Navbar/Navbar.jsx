import { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import NavItems from "./NavItems";

import { IconContext } from "react-icons";
import { HiMenu } from "react-icons/hi";
import { FiSearch, FiX } from "react-icons/fi";

import { AnimatePresence, motion } from "framer-motion";
import ProfileFunctionalities from "./ProfileFunctionalities";
import { SearchContext } from "../context/SearchContext";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTimeout = useRef(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false); // for mobile search toggle
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

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
  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

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

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
      className={`${isAuthPage && "md:hidden"
        } flex flex-row justify-around py-4 mb-[27px] border-b-2 border-neoBorder bg-neoBg md:flex md:flex-wrap md:justify-between md:items-center md:gap-y-4 md:px-[60px]`}
    >
      <div className="md:hidden ml-5 mr-2">
        <IconContext.Provider
          value={{
            color: "#111827",
            className: "global-class-name",
            size: "2.5em",
          }}
        >
          <div className="cursor-pointer">
            <HiMenu onClick={showNavMenuHandler} />
          </div>
        </IconContext.Provider>
      </div>
      {/* ✅ Tablet navbar flex layout wrapper */}
      <div className="w-full md:w-full md:flex md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4">
        <Link to="/">
          <div className="flex flex-row h-[40px] items-center">
            <div>
              <img
                src="/Assets/blog.png"
                alt="Logo"
                className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] object-cover rounded-md border-2 border-neoBorder shadow-neo"
              />
            </div>
            <h1 className="font-bold text-neoBorder text-[24px] pl-[15px] my-auto">
              Sam's Blog
            </h1>
          </div>
        </Link>

        <div className="flex flex-row items-center justify-between md:justify-start md:space-x-5 my-auto">
          {!auth.isLoggedIn && (
            <div className="hidden md:block relative">
              <input
                type="text"
                value={searchQuery}
                className="pl-[40px] pr-10 pb-1 text-neoBorder h-[40px] w-full bg-white border-2 border-neoBorder rounded-md placeholder:text-gray-500 outline-none focus:outline-none focus:shadow-neo tracking-wide transition-all duration-300 ease-in-out font-semibold"
                placeholder="search"
                onChange={onSearchChange}
              />
              <span className="absolute top-3 left-0 flex items-center pl-3">
                <FiSearch className="text-neoBorder opacity-70" />
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute top-[8px] right-5 text-neoBorder opacity-70 hover:opacity-100"
                >
                  <FiX size={22} />
                </button>
              )}
            </div>
          )}
          <div className="hidden md:flex md:flex-row md:space-x-5 text-neoBorder hover:scale-105 transition-all duration-300 ease-in-out">
            {!auth.isLoggedIn && (
              <Link to="/auth">
                <button className="border-2 border-neoBorder rounded-md py-2 px-6 bg-neoYellow font-bold shadow-neo hover:shadow-neoHover transition-all duration-300 ease-in-out text-neoBorder">
                  Sign Up
                </button>
              </Link>
            )}
          </div>
        </div>

        {auth.isLoggedIn && (
          <div className="hidden md:flex md:flex-row md:items-center md:space-x-5">
            {/* Search Input */}
            <div className="hidden md:block relative">
              <input
                type="text"
                className="pl-[40px] pr-10 pb-1 text-neoBorder h-[40px] w-full md:w-[200px] lg:w-[300px] bg-white border-2 border-neoBorder rounded-md placeholder:text-gray-500 outline-none focus:outline-none focus:shadow-neo tracking-wide transition-all font-semibold"
                placeholder="search"
                value={searchQuery}
                onChange={onSearchChange}
              />
              <span className="absolute top-3 left-0 flex items-center pl-3">
                <FiSearch className="text-neoBorder opacity-70" />
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute top-[8px] right-5 text-neoBorder opacity-70 hover:opacity-100"
                >
                  <FiX size={22} />
                </button>
              )}
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
      <div className="my-auto md:hidden mr-5">
        <IconContext.Provider
          value={{
            color: "#111827",
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
              className="w-full px-5 md:hidden mt-2 absolute top-20 left-0 bg-white border-b-2 border-neoBorder z-40 pb-4 shadow-neo"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Search..."
                  className="w-full h-[45px] pl-4 pr-10 rounded-md bg-white text-neoBorder border-2 border-neoBorder placeholder:text-gray-500 outline-none shadow-neo font-bold"
                  onChange={onSearchChange}
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute top-[12px] right-3 text-neoBorder opacity-70 hover:opacity-100"
                  >
                    <FiX size={22} />
                  </button>
                )}
              </div>
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
