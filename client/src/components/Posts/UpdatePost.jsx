import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { linkSite } from "../linkSite";
import Button from "../shared/Button";
import Input from "../shared/Input";
import LoadingSpinner from "../shared/LoadingSpinner";
import RTE from "../shared/RTE";

const UpdatePost = () => {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const [postDetails, setPostDetails] = useState({ post: {} });
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  const dataRef = useRef(null);

  const headlineRef = useRef();
  const descriptionRef = useRef();
  const tagRef = useRef();
  const [description, setDescription] = useState();

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`${linkSite}/api/posts/${postId}`);
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
    await fetch(`${linkSite}/api/posts/update/${postId}`, {
      method: "PATCH",
      body: JSON.stringify({
        headline: headlineRef.current.value,
        description: description,
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

  const getDescription = (e) => {
    setDescription(e);
  };

  return (
    <div className="h-full bg-no-repeat">
      <form onSubmit={formSubmitHandler}>
        <div className="md:w-[80%] md:mx-auto mt-[50px] ">
          <div className="relative z-0  mb-6 group">
            <Input
              labelClass="text-white text-center block md:inline-block"
              label="Headline"
              type="text"
              element="input"
              id="headline"
              className="block py-2.5 px-0 w-[300px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={postDetails.post.headline}
              ref={headlineRef}
            />
          </div>

          <div className="relative z-0 md:w-full mb-6 ">
            <RTE
              description={getDescription}
              value={postDetails.post.description}
            />
          </div>
          <div className="relative z-0 md:w-full mb-6">
            <Input
              labelClass="text-white text-center block my-2 md:my-0 md:inline-block"
              label="Tag"
              type="text"
              element="input"
              id="tag"
              className="block py-2.5 px-0 w-[300px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={postDetails.post.tag}
              ref={tagRef}
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-[150px] px-5 py-2.5 text-center mb-[30px] md:mb-0"
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
