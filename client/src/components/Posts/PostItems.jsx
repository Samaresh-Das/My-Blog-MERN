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
        <li className="list-none h-full">
          <motion.div
            className="h-full bg-white border-4 border-neoBorder rounded-[28px] shadow-neo overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(17,24,39,0.14)]"
            whileHover={{}}
          >
            <Link to={`/post/${id}`} className="flex flex-col h-full">
              <div
                className="h-48 w-full border-b-4 border-neoBorder bg-cover bg-center"
                style={{
                  backgroundImage: `url(${image})`,
                }}
                title={headline}
              />
              <div className="flex flex-col justify-between flex-grow p-6 gap-5">
                <div className="space-y-4">
                  <span className="inline-flex items-center rounded-full border-2 border-neoBorder bg-neoBlue px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-white shadow-[1px_1px_0px_rgba(17,24,39,1)]">
                    {formattedDate}
                  </span>
                  <div className="text-neoBorder font-bold text-[22px] leading-tight line-clamp-2">
                    {headline}
                  </div>
                  <p className="text-gray-700 text-[15px] leading-7 font-medium break-words">
                    {textContent.length > Max_Length_Of_Description
                      ? shortDescription
                      : textContent}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-3 rounded-2xl border-2 border-neoBorder bg-neoPink p-4 shadow-[2px_2px_0px_rgba(17,24,39,1)]">
                  <img
                    className="h-12 w-12 rounded-full border-2 border-neoBorder object-cover"
                    src={profilePicture}
                    alt={`${creatorName}'s profile picture`}
                  />
                  <div className="text-sm">
                    <p className="text-neoBorder font-bold text-[15px] leading-none">
                      {creatorName}
                    </p>
                    <p className="text-gray-800 font-semibold mt-1">
                      {tagline}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </li>
      </Fragment>
    );
  },
);

export default PostItems;
