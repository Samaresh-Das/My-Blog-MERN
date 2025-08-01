import React, { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { linkSite } from "../linkSite";
import ImageUpload from "../shared/ImageUpload";
import Input from "../shared/Input";
import RTE from "../shared/RTE";
import { createPost_dropdownList } from "../shared/frontend_data";
import PostTagSelector from "./PostTagSelector";

const CreatePost = () => {
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [tag, setTag] = useState("");
  const [noTitleErrors, setNoTitleErrors] = useState(false);
  const [noTagErrors, setNoTagErrors] = useState(false);

  const imageHandler = (e) => {
    setImage(e);
  };

  const getTitle = (e) => {
    setTitle(e.target.value);
    setNoTitleErrors(false);
  };

  const getDescription = (e) => {
    setDescription(e);
  };

  const getTag = (value) => {
    setTag(value);
    if (value) setNoTagErrors(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      setNoTitleErrors(true);
      return;
    }
    if (!tag) {
      setNoTagErrors(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("headline", title);
      formData.append("description", description);
      formData.append("tag", tag);
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
              <div className="col-start-2 col-span-4 md:col-span-5">
                <Input
                  labelClass="block text-sm font-medium"
                  label="Title"
                  type="text"
                  element="input"
                  id="headline"
                  className="mt-1 block w-full rounded-xl border border-purple-900/30 bg-white/10 backdrop-blur-sm shadow-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 sm:text-sm h-[40px] transition-all duration-200 p-3"
                  onChange={getTitle}
                  placeholder="Enter post title"
                />
                {noTitleErrors && (
                  <p className="text-red-400 font-bold">
                    Please provide a title
                  </p>
                )}
              </div>

              <div className="col-start-2 col-span-4 md:col-span-5 rounded-xl bg-white/10 backdrop-blur-md p-4 shadow-md border border-purple-900/20">
                <RTE description={getDescription} />
              </div>
              <div className="col-start-2 col-span-4 sm:col-span-6 lg:col-span-2">
                <PostTagSelector
                  dropdownList={createPost_dropdownList}
                  getTag={getTag}
                />
                {noTagErrors && (
                  <p className="text-red-400 font-bold">Please select a tag</p>
                )}
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
