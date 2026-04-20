import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const ProfileFunctionalities = ({
  showDropdown,
  showMenuDropdown,
  hideMenuDropdown,
  logoutHandler,
  userPhoto,
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={showMenuDropdown}
      onMouseLeave={hideMenuDropdown}
    >
      <Link to="/profile">
        <img
          className="w-[48px] h-[48px] rounded-full mr-3 object-cover border-4 border-neoBorder shadow-neo hover:shadow-neoHover hover:-translate-y-0.5 transition-all"
          src={userPhoto}
          alt="User Avatar"
        />
      </Link>

      {showDropdown && <ProfileDropdown logoutHandler={logoutHandler} />}
    </div>
  );
};

export default ProfileFunctionalities;
