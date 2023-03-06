import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "../shared/LoadingSpinner";

const PostDetail = () => {
  console.log("...rendering");
  const [postDetails, setPostDetails] = useState({ post: {} });
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  const dataRef = useRef(null);

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
      const data = await response.json();
      dataRef.current = data; //if we don't use the data red the value will be lost after each render cycle or app restart, so we used ref for that
      // setPosts(dataRef.current);
      setPostDetails(dataRef.current);
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

  return (
    <Fragment>
      <div className="h-full relative">
        <div className="patrick-hand flex flex-row justify-center text-[18px]">
          <h1 className="mt-[30px] text-white opacity-40">
            {tag} &#8226; {formattedDate}
          </h1>
        </div>
        <div className="mt-[11px] text-white text-[24px] patrick-hand text-center mx-[20px]">
          {headline}
        </div>
        <div className="flex items-center justify-center  mt-[30px]">
          <img
            className="w-[61px] h-[61px] rounded-full mr-3"
            src={profilePicture}
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-white leading-none patrick-hand text-[18px]">
              {creatorName}
            </p>
            <p className="text-white opacity-50 patrick-hand text-[16px]">
              {tagline}
            </p>
          </div>
        </div>
        <img
          src={`http://localhost:5000/${image}`}
          alt="cover"
          className="mx-auto px-[20px] mt-[40px] md:h-[594px]"
        />
        <div className="text-white patrick-hand text-left mx-[20px] md:mx-[200px] mt-[30px] md:text-[20px]">
          {description &&
            description.split("\\n").map((paragraph, index) => (
              <ReactMarkdown key={index} className="markdown-img">
                {paragraph}
              </ReactMarkdown>
            ))}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default PostDetail;
