import React from "react";
import { Link } from "react-router-dom";

const NoPostFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white/80">
      <h2 className="text-2xl font-semibold text-purple-300 mb-2">
        No posts found
      </h2>
      <p className="text-white/60 mb-4 text-center max-w-md">
        Seems like nothing has been created in this category yet. Be the first
        to contribute something amazing!
      </p>
      <Link
        to="/create"
        className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition-all shadow-lg"
      >
        ✍️ Create a Post
      </Link>
    </div>
  );
};

export default NoPostFound;
