import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ logoutHandler }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="profileDropdown"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        id="dropdownHover"
        className="absolute right-0 top-full mt-2 rounded-xl shadow-neoLg w-48 z-50 border-4 border-neoBorder bg-white overflow-hidden"
      >
        <ul className="py-1 text-neoBorder font-bold" aria-labelledby="dropdownHoverButton">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-3 hover:bg-neoYellow transition-all border-b-2 border-neoBorder"
            >
              👤 Profile
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              className="flex items-center gap-2 px-4 py-3 hover:bg-neoGreen transition-all border-b-2 border-neoBorder"
            >
              ✍️ Create Post
            </Link>
          </li>
          <li>
            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-neoPink transition-all"
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileDropdown;

