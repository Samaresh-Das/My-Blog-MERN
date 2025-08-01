import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ logoutHandler }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="profileDropdown"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.4 }}
        id="dropdownHover"
        className="absolute right-0 top-full mt-2 rounded-lg shadow w-44 z-50 border border-1 border-purple-950 transition-all duration-300 ease-in-out"
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
            <Link to="/create" className="block px-4 py-2 hover:text-[#e647ff]">
              Create Post
            </Link>
          </li>
          <li>
            <button
              onClick={logoutHandler}
              className="block w-full text-left px-4 py-2 hover:text-[#e647ff]"
            >
              Logout
            </button>
          </li>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileDropdown;
