import React, { useState } from "react";

const PostTagSelector = ({ dropdownList, getTag }) => {
  const [selectedTag, setSelectedTag] = useState(null);

  const onSelectingTag = (value) => {
    setSelectedTag(value);
    getTag(value);
  };
  return (
    <div className="flex  gap-3 mt-2">
      {dropdownList.map((item) => {
        const isSelected = selectedTag === item.content;
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => onSelectingTag(item.content)}
            className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border transition-all duration-200
              ${
                isSelected
                  ? "bg-violet-600/70 text-white border-violet-500 shadow-md"
                  : "bg-white/10 text-white/70 border-purple-800 hover:bg-violet-600/30 hover:text-white"
              }
            `}
          >
            {item.content}
          </button>
        );
      })}
    </div>
  );
};

export default PostTagSelector;
