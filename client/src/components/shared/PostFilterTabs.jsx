import React from "react";

const PostFilterTabs = ({ tabs, selectedTab, onTabSelect }) => {
  return (
    <div className="mt-12 relative mx-5 rounded-[28px] overflow-hidden border-4 border-neoBorder shadow-neo bg-white w-full max-w-full">
      <ul className="flex flex-row md:flex-wrap gap-3 md:gap-4 items-center justify-start p-4 overflow-x-auto whitespace-nowrap scrollbar-hide font-bold">
        {tabs.map(({ label, value }, index) => (
          <li
            key={index}
            className={`cursor-pointer rounded-lg px-5 py-2 border-2 border-neoBorder transition-all duration-300 ease-in-out shadow-neo block ${
              selectedTab === value
                ? "bg-neoBorder text-white"
                : "bg-neoPink text-neoBorder hover:bg-neoYellow"
            }`}
            onClick={() => onTabSelect(value)}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostFilterTabs;
