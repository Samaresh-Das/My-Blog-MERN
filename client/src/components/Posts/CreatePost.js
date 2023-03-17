import React, { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { linkSite } from "../linkSite";
import ImageUpload from "../shared/ImageUpload";
import Input from "../shared/Input";
import RTE from "../shared/RTE";

const CreatePost = () => {
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();

  const titleRef = useRef();
  // const descriptionRef = useRef();
  const tagRef = useRef();

  const imageHandler = (e) => {
    setImage(e);
    console.log(image);
  };

  const getDescription = (e) => {
    setDescription(e);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("headline", titleRef.current.value);
      formData.append("description", description);
      formData.append("tag", tagRef.current.value);
      formData.append("image", image);
      await fetch(`${linkSite}/api/posts/new`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      history.push("/");
    } catch (err) {}
  };

  return (
    <div className="mt-[50px] md:mx-[10%] h-full md:h-full">
      <form onSubmit={handleSubmit}>
        <div className=" drop-shadow-xl sm:rounded-md">
          <div className=" text-white sm:p-6 ">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-start-2 col-span-4 md:col-span-5 ">
                <Input
                  labelClass="block text-sm font-medium"
                  label="Title"
                  type="text"
                  element="input"
                  id="headline"
                  className="mt-1 block w-full rounded-md  shadow-sm  sm:text-sm h-[40px] text-black"
                  ref={titleRef}
                />
              </div>

              <div className="col-start-2 col-span-4 md:col-span-5">
                <RTE description={getDescription} />
              </div>
              <div className="col-start-2 col-span-4 sm:col-span-6 lg:col-span-2">
                <Input
                  labelClass="block text-sm font-medium text-white"
                  label="Tag"
                  type="text"
                  element="input"
                  id="tag"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[40px] text-black"
                  ref={tagRef}
                />
              </div>
            </div>
            <ImageUpload onInput={imageHandler} />
          </div>
          <div className="px-4 py-3 flex justify-center sm:px-6 mb-[30px] md:mb-0">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
