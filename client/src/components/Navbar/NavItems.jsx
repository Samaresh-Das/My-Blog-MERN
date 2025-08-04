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
      className="fixed top-0 left-0 w-full h-full z-50 bg-black/20 bg-opacity-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => props.onHide(false)}
    >
      <motion.div
        className="bg-white/5 backdrop-blur-xl w-[250px] h-full p-5 shadow-lg "
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-between items-center mb-4">
          {isLoggedIn && (
            <button
              className="text-white mb-4"
              onClick={() => props.onHide(false)}
            >
              <Link to="/profile">
                <img
                  className="w-[40px] h-[40px] rounded-full my-auto object-cover"
                  src={userPhoto}
                  alt="User Avatar"
                />
              </Link>
            </button>
          )}
          <button
            className="text-white mb-4"
            onClick={() => props.onHide(false)}
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col items-scenter justify-center h-full">
          <ul className="text-white text-[18px] space-y-4 mx-auto">
            {isLoggedIn && (
              <li onClick={hideNav}>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li onClick={hideNav}>
                <Link to="/auth">Sign up</Link>
              </li>
            )}
            {isLoggedIn && (
              <li onClick={hideNav}>
                <Link to="/create">Create Post</Link>
              </li>
            )}
            <li onClick={hideNav}>Contact Me</li>
            {isLoggedIn && <li onClick={logoutHandler}>Logout</li>}
            <li onClick={hideNav}>
              <Link to="/terms">Terms</Link>
            </li>
            <li onClick={hideNav}>
              <Link to="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NavItems;
