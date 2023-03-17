import React, { memo, Fragment } from "react";
import { Link } from "react-router-dom";
import { linkSite } from "../linkSite";
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
    const imageUrl = `${linkSite}/${image.replace(/\\/g, "/")}`;
    const { shortDescription, Max_Length_Of_Description, textContent } =
      shortingDesc(description);
    return (
      <Fragment key={id}>
        <li>
          <div className="px-[20px] text  md:w-[300px]">
            <Link to={`/post/${id}`}>
              <div
                className="h-48 rounded-lg text-center flex-none bg-cover bg-center mb-[10px]"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                }}
                title={headline}
              ></div>
              <div className="p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                  <div className="text-white mb-2 patrick-hand text-[20px]">
                    {headline}
                  </div>
                  <p className="text-white text-[16px] opacity-50">
                    {textContent.length > Max_Length_Of_Description
                      ? shortDescription
                      : textContent}
                  </p>
                </div>
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                    src={profilePicture}
                    alt="Avatar of Jonathan Reinink"
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
