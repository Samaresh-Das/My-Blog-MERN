import React from "react";
import { Link } from "react-router-dom";

const NavItems = () => {
  return (
    <div className="absolute top-[105px] left-[30px] navBox text-white p-[10px] rounded-lg w-[150px] transition-all z-10">
      <ul className=" text-[18px]">
        <li className="my-1">Sign In</li>
        <li className="my-1">Log In</li>
        <li className="my-1">Contact Me</li>
        <Link to="/create">Create Post</Link>
      </ul>
    </div>
  );
};

export default NavItems;
