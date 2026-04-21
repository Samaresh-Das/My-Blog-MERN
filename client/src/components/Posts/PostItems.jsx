import React, { memo, Fragment } from "react";
import { Link } from "react-router-dom";
import { shortingDesc } from "./shortDesc";
import { motion } from "framer-motion";

const PostItems = memo(
  ({
    id,
    image,
    headline,
    description,
    profilePicture,
    creatorName,
    tagline,
    isLastItem,
    createdAt,
  }) => {
    const date = new Date(createdAt);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    // const imageUrl = `${linkSite}/${image.replace(/\\/g, "/")}`;
    const { shortDescription, Max_Length_Of_Description, textContent } =
      shortingDesc(description);
    return (
      <Fragment key={id}>
        <li className="my-10 mx-5 list-none">
          <motion.div 
            className="md:h-[530px] md:w-[320px] bg-white border-4 border-neoBorder rounded-xl shadow-neo relative flex flex-col transition-all cursor-pointer overflow-hidden"
            whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px rgba(17,24,39,1)" }}
          >
            <Link to={`/post/${id}`} className="flex flex-col h-full">
              <div
                className="h-52 w-full border-b-4 border-neoBorder text-center flex-none bg-cover bg-center"
                style={{
                  backgroundImage: `url(${image})`,
                }}
                title={headline}
              ></div>
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-neoBlue border-2 border-neoBorder px-2 py-0.5 rounded text-[12px] font-bold shadow-[1px_1px_0px_rgba(17,24,39,1)]">
                      {formattedDate}
                    </span>
                  </div>
                  <div className="text-neoBorder font-bold mb-2 text-[22px] leading-tight line-clamp-2">{headline}</div>
                  <p className="text-gray-700 text-[16px] font-medium break-words">
                    {textContent.length > Max_Length_Of_Description
                      ? shortDescription
                      : textContent}
                  </p>
                </div>
                <div className="flex items-center mt-auto p-3 border-2 border-neoBorder rounded-lg bg-neoPink shadow-[2px_2px_0px_rgba(17,24,39,1)]">
                  <img
                    className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-neoBorder"
                    src={profilePicture}
                    alt={`${creatorName}'s profile picture`}
                  />
                  <div className="text-sm">
                    <p className="text-neoBorder font-bold text-[15px] leading-none">{creatorName}</p>
                    <p className="text-gray-800 font-semibold mt-1">{tagline}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </li>
      </Fragment>
    );
  }
);

export default PostItems;
