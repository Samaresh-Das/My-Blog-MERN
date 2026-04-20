import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div role="status" className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl border-4 border-neoBorder border-t-neoYellow animate-spin shadow-neo" />
        <span className="text-neoBorder font-bold text-lg tracking-wide">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;

