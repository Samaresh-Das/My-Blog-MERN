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
          className="w-[51px] h-[51px] rounded-full mr-3 object-cover"
          src={userPhoto}
          alt="User Avatar"
        />
      </Link>

      {showDropdown && <ProfileDropdown logoutHandler={logoutHandler} />}
    </div>
  );
};

export default ProfileFunctionalities;
