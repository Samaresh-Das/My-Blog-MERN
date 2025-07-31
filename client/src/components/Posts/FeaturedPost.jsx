import React, { memo } from "react";
import { Link } from "react-router-dom";
import { shortingDesc } from "./shortDesc";

const FeaturedPost = memo(
  ({
    id,
    image,
    headline,
    description,
    profilePicture,
    creatorName,
    tagline,
  }) => {
    const { shortDescription, Max_Length_Of_Description } =
      shortingDesc(description);
    return (
      <Link to={`/post/${id}`}>
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:space-x-2 md:mx-10 md:mt-20 lg:mx-[100px] lg:mt-[60px] ">
          <img
            src={image}
            alt="banner"
            className="md:col-span-2 md:w-full lg:h-[450px] lg:w-11/12 object-cover"
          />
          <div className="mt-10">
            <div className="text-white mb-2 patrick-hand text-[20px] md:text-[30px]">
              {headline}
            </div>
            <p className="text-white s text-[16px] opacity-50">
              {description.length > Max_Length_Of_Description
                ? shortDescription
                : description}
            </p>
            <div className="flex items-center mt-10">
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
        </div>
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-50 border-0 rounded hidden md:block md:mt-10 dark:bg-gray-500" />
      </Link>
    );
  }
);

export default FeaturedPost;
