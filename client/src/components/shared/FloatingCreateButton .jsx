import { Link } from "react-router-dom";
import { FiFeather } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const FloatingCreateButton = () => {
  return (
    <>
      <Link
        to="/create"
        className="fixed bottom-6 right-6 z-50 bg-violet-600/30 text-white p-4 rounded-full shadow-xl hover:bg-violet-700 transition-all duration-300 group"
        data-tooltip-id="create-tooltip"
        data-tooltip-content="Create Post"
      >
        <FiFeather className="text-xl group-hover:scale-110 transition-transform" />
      </Link>

      <Tooltip
        id="create-post"
        place="top"
        className="z-50 !bg-white/10 !backdrop-blur-lg !text-white border border-purple-800/30 shadow-md"
      />
    </>
  );
};

export default FloatingCreateButton;
