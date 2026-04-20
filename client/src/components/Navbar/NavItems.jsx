import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { motion, AnimatePresence } from "framer-motion";

const NavItems = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const hideNav = () => {
    props.onHide(false);
  };

  const ifNotOnHomepage = location.pathname !== "/";
  const userPhoto = localStorage.getItem("userPhoto"); //get user photo from localStorage

  const logoutHandler = () => {
    //if on the homepage no need to redirect.
    hideNav();
    if (ifNotOnHomepage) {
      history.push("/");
      logout();
    } else {
      logout();
    }
  };
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full z-50 bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => props.onHide(false)}
    >
      <motion.div
        className="bg-neoBg border-r-4 border-neoBorder w-[280px] h-full p-6 shadow-neoLg"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-between items-center mb-6">
          {isLoggedIn && (
            <button
              className="mb-4"
              onClick={() => props.onHide(false)}
            >
              <Link to="/profile">
                <img
                  className="w-[50px] h-[50px] rounded-full my-auto object-cover border-2 border-neoBorder shadow-neo"
                  src={userPhoto}
                  alt="User Avatar"
                />
              </Link>
            </button>
          )}
          <button
            className="text-neoBorder text-2xl font-bold bg-white border-2 border-neoBorder w-10 h-10 rounded-md shadow-neo mb-4 flex items-center justify-center hover:bg-neoPink hover:translate-y-[2px] transition-all"
            onClick={() => props.onHide(false)}
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col h-full font-bold">
          <ul className="text-neoBorder text-[20px] space-y-6 w-full">
            {isLoggedIn && (
              <li className="p-2 border-b-2 border-neoBorder w-full hover:bg-neoPink hover:pl-4 transition-all" onClick={hideNav}>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="p-2 border-b-2 border-neoBorder w-full hover:bg-neoYellow hover:pl-4 transition-all" onClick={hideNav}>
                <Link to="/auth">Sign up</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="p-2 border-b-2 border-neoBorder w-full hover:bg-neoGreen hover:pl-4 transition-all" onClick={hideNav}>
                <Link to="/create">Create Post</Link>
              </li>
            )}
            <li className="p-2 border-b-2 border-neoBorder w-full hover:bg-neoBlue hover:pl-4 transition-all" onClick={hideNav}>
              <Link to="/contact">Contact Me</Link>
            </li>
            {isLoggedIn && (
              <li className="p-2 border-b-2 border-neoBorder w-full hover:bg-red-300 hover:pl-4 transition-all cursor-pointer" onClick={logoutHandler}>
                  Logout
              </li>
            )}
            <li className="p-2 border-b-2 border-neoBorder w-full hover:bg-neoYellow hover:pl-4 transition-all" onClick={hideNav}>
              <Link to="/terms">Terms</Link>
            </li>
            <li className="p-2 border-b-2 border-neoBorder w-full hover:bg-neoPink hover:pl-4 transition-all" onClick={hideNav}>
              <Link to="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NavItems;
