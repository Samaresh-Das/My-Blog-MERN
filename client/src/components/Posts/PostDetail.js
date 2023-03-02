import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import ReactMarkdown from "react-markdown";

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
    return (
      <div className="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const {
    createdAt,
    creatorName,
    description,
    headline,
    profilePicture,
    tagline,
    tag,
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
          src="/Assets/post1.png"
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
