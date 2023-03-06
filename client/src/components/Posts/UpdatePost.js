import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import LoadingSpinner from "../shared/LoadingSpinner";

const UpdatePost = () => {
  console.log("...rendering");
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const [postDetails, setPostDetails] = useState({ post: {} });
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  const dataRef = useRef(null);

  const headlineRef = useRef();
  const descriptionRef = useRef();
  const tagRef = useRef();

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
    return <LoadingSpinner />;
  }
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await fetch(`http://localhost:5000/api/posts/update/${postId}`, {
      method: "PATCH",
      body: JSON.stringify({
        headline: headlineRef.current.value,
        description: descriptionRef.current.value,
        tag: tagRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    setIsLoading(false);
    history.push(`/post/${postId}`); //forwarding the user to post details
  };

  return (
    <div className="h-full bg-no-repeat">
      <form onSubmit={formSubmitHandler}>
        <div className="md:w-[500px] md:mx-auto mt-[50px] ">
          <div className="relative z-0  mb-6 group">
            <label
              htmlFor="headline"
              className="text-white text-center block md:inline-block"
            >
              Headline
            </label>
            <input
              type="text"
              id="headline"
              className="block py-2.5 px-0 w-[300px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={postDetails.post.headline}
              ref={headlineRef}
            />
          </div>

          <div className="relative z-0 md:w-full mb-6 ">
            <label
              htmlFor="description"
              className="text-white text-center block md:inline-block my-2 md:my-0"
            >
              Description
            </label>
            <textarea
              id="description"
              type="text"
              className="block py-2.5 px-0 w-[300px] h-[100px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={postDetails.post.description}
              ref={descriptionRef}
            />
          </div>
          <div className="relative z-0 md:w-full mb-6">
            <label
              htmlFor="tagline"
              className="text-white text-center block my-2 md:my-0 md:inline-block"
            >
              Tag
            </label>
            <input
              id="tagline"
              type="text"
              className="block py-2.5 px-0 w-[300px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={postDetails.post.tag}
              ref={tagRef}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-[150px] px-5 py-2.5 text-center mb-[30px] md:mb-0"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
