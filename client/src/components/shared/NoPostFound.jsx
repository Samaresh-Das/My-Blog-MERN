import React from "react";
import { Link } from "react-router-dom";

const NoPostFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white border-4 border-neoBorder rounded-xl p-8 shadow-neo max-w-lg mx-auto mt-20">
      <h2 className="text-3xl font-bold text-neoBorder mb-4">
        No posts found
      </h2>
      <p className="text-neoBorder font-medium mb-8 text-center text-lg">
        Seems like nothing has been created in this category yet. Be the first
        to contribute something amazing!
      </p>
      <Link
        to="/create"
        className="px-6 py-3 rounded-lg bg-neoYellow border-2 border-neoBorder text-neoBorder font-bold shadow-[4px_4px_0px_rgba(17,24,39,1)] hover:shadow-[6px_6px_0px_rgba(17,24,39,1)] hover:-translate-y-1 transition-all"
      >
        ✍️ Create a Post
      </Link>
    </div>
  );
};

export default NoPostFound;
