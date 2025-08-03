import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import LoadingSpinner from "../shared/LoadingSpinner";
import { linkSite } from "../linkSite";

const PostDetail = () => {
  const [postDetails, setPostDetails] = useState({ post: {} });
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  // const dataRef = useRef(null);

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`${linkSite}/api/posts/${postId}`);
      const data = await response.json();
      // dataRef.current = data; //if we don't use the data red the value will be lost after each render cycle or app restart, so we used ref for that
      // setPosts(dataRef.current);
      setPostDetails(data);
      setIsLoading(false);
    };
    getPost();
  }, [postId]);

  if (isLoading) {
    //loading spinner
    return <LoadingSpinner />;
  }

  const {
    createdAt,
    creatorName,
    description,
    headline,
    profilePicture,
    tagline,
    tag,
    image,
  } = postDetails.post;

  const dateString = createdAt;
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <Fragment>
      <div className="h-full relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex flex-row justify-center text-[18px]">
            <h1 className="mt-[30px] text-white opacity-40">
              {tag} &#8226; {formattedDate}
            </h1>
          </div>
          <div className="mt-[11px] text-white font-bold text-[24px] text-center mx-[20px]">
            {headline}
          </div>
          <div className="flex items-center justify-center  mt-[30px]">
            <img
              className="w-[61px] h-[61px] rounded-full mr-3 object-cover"
              src={profilePicture}
              alt="Avatar of Jonathan Reinink"
            />
            <div className="text-sm">
              <p className="text-white leading-none text-[18px]">
                {creatorName}
              </p>
              <p className="text-white opacity-50 text-[16px]">{tagline}</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-[40px] px-[20px] md:px-[80px] pt-[30px] pb-[50px] bg-white/10 backdrop-blur-lg rounded-[40px] md:rounded-[80px] shadow-xl border border-white/10 md:mx-8 lg:mx-20"
        >
          <img
            src={image}
            alt="cover"
            className="mx-auto mt-[40px] mb-10 w-[90%] lg:w-[80%] h-[200px]  lg:h-[594px] object-cover rounded-3xl shadow-lg"
          />

          <div className="text-white text-left w-[90%] md:w-[80%] mx-auto mt-[10px] md:text-[22px] leading-relaxed htmlParsed">
            {parse(sanitizedDescription.toString())}
          </div>
        </motion.div>
      </div>
    </Fragment>
  );
};

export default PostDetail;
