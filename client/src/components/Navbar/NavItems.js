import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const NavItems = (props) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const hideNav = () => {
    props.onHide(false);
  };
  return (
    <div className="absolute top-[105px] left-[30px] navBox text-white p-[10px] rounded-lg w-[150px] transition-all z-10">
      <ul className=" text-[18px]">
        <li className="my-1" onClick={hideNav}>
          <Link to="/profile">Profile</Link>
        </li>
        {!isLoggedIn && (
          <li className="my-1" onClick={hideNav}>
            <Link to="/auth">Sign up</Link>
          </li>
        )}
        {isLoggedIn && (
          <li onClick={hideNav}>
            <Link to="/create">Create Post</Link>
          </li>
        )}
        <li className="my-1" onClick={hideNav}>
          Contact Me
        </li>
        {isLoggedIn && (
          <li className="my-1" onClick={logout}>
            Logout
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavItems;
