import React, { memo, Fragment } from "react";
import { Link } from "react-router-dom";
import { shortingDesc } from "./shortDesc";

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
  }) => {
    // const imageUrl = `${linkSite}/${image.replace(/\\/g, "/")}`;
    const { shortDescription, Max_Length_Of_Description, textContent } =
      shortingDesc(description);
    return (
      <Fragment key={id}>
        <li className="my-10 mx-5">
          <div className="px-[20px] md:h-[500px]  md:w-[300px] hover:scale-105 transition delay-150 duration-300 ease-in-out md:relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-lg hover:shadow-[#5c1eae]/30">
            <Link to={`/post/${id}`}>
              <div
                className="h-48 rounded-lg text-center flex-none bg-cover bg-center mb-[10px] mt-6"
                style={{
                  backgroundImage: `url(${image})`,
                }}
                title={headline}
              ></div>
              <div className="p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                  <div className="text-white mb-2 patrick-hand text-[20px]">
                    {headline}
                  </div>
                  <p className="text-white text-[16px] opacity-50 break-words">
                    {textContent.length > Max_Length_Of_Description
                      ? shortDescription
                      : textContent}
                  </p>
                </div>
                <div className="flex items-center md:absolute md:bottom-0 md:left-0 md:p-4">
                  <img
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                    src={profilePicture}
                    alt={`${creatorName}'s profile picture`}
                  />
                  <div className="text-sm">
                    <p className="text-white leading-none">{creatorName}</p>
                    <p className="text-white opacity-50">{tagline}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {!isLastItem && (
            <hr className="mx-[30px] mb-[30px] border-2 border-gray-400 opacity-50 md:hidden" />
          )}
        </li>
      </Fragment>
    );
  }
);

export default PostItems;
