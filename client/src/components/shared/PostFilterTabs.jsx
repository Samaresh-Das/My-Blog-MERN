// import React from "react";

// const PostFilterTabs = ({ tabs, onTabSelect }) => {
//   return (
//     <div className="mt-20">

//       <ul className="flex flex-row flex-wrap md:space-x-6 md:gap-y-2 text-white my-auto justify-start pl-10 md:pl-20 ">
//         {tabs.map(({ label, value }, index) => (
//           <li
//             key={index}
//             className="mr-5 mt-2 md:mt-0 md:mr-0 cursor-pointer border-2 border-gray-300 rounded-2xl px-4 py-2 hover:bg-white/10 transition-all duration-300 ease-in-out backdrop-blur-2xl hover:shadow-lg bg-white/5 border-white/10 p-3 shadow-lg hover:shadow-[#5c1eae]/30"
//             onClick={() => onTabSelect(value)}
//           >
//             {label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PostFilterTabs;

import React from "react";

const PostFilterTabs = ({ tabs, onTabSelect }) => {
  return (
    <div className="mt-12 relative mx-5 rounded-lg overflow-hidden border-4 border-neoBorder shadow-neo bg-white w-max max-w-full">
      <ul
        className="flex flex-row md:flex-wrap md:space-x-6 gap-x-4 md:gap-y-4 text-neoBorder justify-start p-4
        overflow-x-auto whitespace-nowrap scrollbar-hide relative z-20 font-bold items-center"
      >
        {tabs.map(({ label, value }, index) => (
          <li
            key={index}
            className="md:mr-0 cursor-pointer border-2 border-neoBorder rounded-lg px-6 py-2
            hover:bg-neoYellow transition-all duration-300 ease-in-out shadow-neo hover:shadow-neoHover hover:-translate-y-1 block bg-neoPink"
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
