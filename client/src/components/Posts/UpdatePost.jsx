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

  const getDescription = React.useCallback((e) => {
    setDescription(e);
  }, []);

  return (
    <div className="px-4 md:px-0">
      <form onSubmit={formSubmitHandler}>
        <div className="max-w-4xl mx-auto mt-[50px] bg-white border-4 border-neoBorder rounded-xl shadow-neoLg p-6 md:p-10 mb-20">
          <h1 className="text-center font-black text-neoBorder text-[32px] mb-8 pb-4 border-b-4 border-neoBorder">Update Post</h1>
          <div className="relative z-0 mb-6 group w-full">
            <Input
              labelClass="text-neoBorder font-bold text-[18px] mb-2 block"
              label="Headline"
              type="text"
              element="input"
              id="headline"
              className="w-full bg-white border-2 border-neoBorder text-neoBorder font-semibold p-3 rounded-lg outline-none focus:shadow-neo hover:shadow-neo transition-shadow placeholder:text-gray-500"
              placeholder={postDetails.post.headline}
              ref={headlineRef}
            />
          </div>

          <div className="relative z-0 w-full mb-6 border-2 border-neoBorder rounded-lg p-2 md:p-4 shadow-neo bg-white">
            <label className="text-neoBorder font-bold text-[18px] mb-2 block">Post Content</label>
            <RTE
              description={getDescription}
              value={postDetails.post.description}
            />
          </div>
          <div className="relative z-0 w-full mb-10">
            <Input
              labelClass="text-neoBorder font-bold text-[18px] mb-2 block"
              label="Tag"
              type="text"
              element="input"
              id="tag"
              className="w-full bg-white border-2 border-neoBorder text-neoBorder font-semibold p-3 rounded-lg outline-none focus:shadow-neo hover:shadow-neo transition-shadow placeholder:text-gray-500"
              placeholder={postDetails.post.tag}
              ref={tagRef}
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              className="w-full md:w-auto min-w-[200px] text-[18px] py-3 bg-neoBlue rounded-lg shadow-[4px_4px_0px_#111827]"
            >
              Update Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
