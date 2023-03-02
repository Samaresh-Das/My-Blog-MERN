import React from "react";
import { Link } from "react-router-dom";

const NavItems = () => {
  return (
    <div className="absolute top-[105px] left-[30px] navBox text-white p-[10px] rounded-lg w-[150px] transition-all z-10">
      <ul className=" text-[18px]">
        <li className="my-1">Sign In</li>
        <l className="my-1">
          <Link to="/auth">Sign up</Link>
        </l>
        <li className="my-1">Contact Me</li>
        <Link to="/create">Create Post</Link>
      </ul>
    </div>
  );
};

export default NavItems;
