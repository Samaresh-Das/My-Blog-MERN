import React, { memo } from "react";
import { Link } from "react-router-dom";
import { shortingDesc } from "./shortDesc";
import { motion } from "framer-motion";

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
        <motion.div 
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:mx-10 md:mt-20 lg:mx-[100px] lg:mt-[60px] bg-white border-4 border-neoBorder rounded-xl p-6 shadow-neo hover:shadow-neoLg transition-all duration-300 relative overflow-hidden"
          whileHover={{ y: -4, x: -4 }}
        >
          <img
            src={image}
            alt="banner"
            className="md:col-span-2 md:w-full lg:h-[450px] lg:w-full object-cover rounded-md border-2 border-neoBorder shadow-neo"
          />
          <div className="mt-10 lg:mt-0 lg:pl-6 flex flex-col justify-center">
            <div className="text-neoBorder font-bold mb-4 text-[24px] md:text-[36px] leading-tight">
              {headline}
            </div>
            <p className="text-gray-700 font-medium text-[18px]">
              {description.length > Max_Length_Of_Description
                ? shortDescription
                : description}
            </p>
            <div className="flex items-center mt-10 p-4 border-2 border-neoBorder rounded-xl shadow-neo bg-neoYellow inline-block self-start w-full lg:w-auto">
              <img
                className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-neoBorder"
                src={profilePicture}
                alt="Avatar of Jonathan Reinink"
              />
              <div className="text-sm">
                <p className="text-neoBorder font-bold text-[16px] leading-none">{creatorName}</p>
                <p className="text-gray-700 font-semibold mt-1">{tagline}</p>
              </div>
            </div>
          </div>
        </motion.div>
        <hr className="w-48 h-1 mx-auto my-12 bg-neoBorder border-0 rounded hidden md:block" />
      </Link>
    );
  }
);

export default FeaturedPost;
