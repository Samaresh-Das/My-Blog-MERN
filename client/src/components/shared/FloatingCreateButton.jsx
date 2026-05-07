import { Link } from "react-router-dom";
import { FiFeather } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const FloatingCreateButton = () => {
  return (
    <>
      <Link
        to="/create"
        className="fixed bottom-6 right-6 z-50 bg-neoGreen text-neoBorder p-4 rounded-xl border-4 border-neoBorder shadow-neo hover:shadow-neoHover hover:-translate-y-1 transition-all duration-300 group"
        data-tooltip-id="create-tooltip"
        data-tooltip-content="Create Post"
      >
        <FiFeather className="text-2xl group-hover:scale-110 transition-transform font-bold" />
      </Link>

      <Tooltip
        id="create-post"
        place="top"
        className="z-50 !bg-white !text-neoBorder border-2 border-neoBorder !shadow-[4px_4px_0px_rgba(17,24,39,1)] font-bold rounded-lg"
      />
    </>
  );
};

export default FloatingCreateButton;
