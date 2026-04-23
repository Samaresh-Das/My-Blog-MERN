import React, { useState } from "react";

const PostTagSelector = ({ dropdownList, getTag, initialValue }) => {
  const [selectedTag, setSelectedTag] = React.useState(initialValue);

  React.useEffect(() => {
    setSelectedTag(initialValue);
  }, [initialValue]);

  const onSelectingTag = (value) => {
    setSelectedTag(value);
    getTag(value);
  };
  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {dropdownList.map((item) => {
        const isSelected = selectedTag && item.content && selectedTag.trim().toLowerCase() === item.content.trim().toLowerCase();
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => onSelectingTag(item.content)}
            className={`px-4 py-2 rounded-lg text-md transition-all duration-200 border-2 border-neoBorder focus:outline-none
              ${
                isSelected
                  ? "bg-neoPink text-neoBorder font-bold shadow-[4px_4px_0px_#111827] -translate-y-1"
                  : "bg-white text-neoBorder font-semibold shadow-none hover:bg-neoYellow hover:shadow-[4px_4px_0px_#111827] hover:-translate-y-1"
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
