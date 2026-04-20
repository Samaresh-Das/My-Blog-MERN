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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageHandler = (e) => {
    setImage(e);
  };

  const getTitle = (e) => {
    setTitle(e.target.value);
    setNoTitleErrors(false);
  };

  const getDescription = React.useCallback((e) => {
    setDescription(e);
  }, []);

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

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("headline", title);
      formData.append("description", description);
      formData.append("category", tag);
      formData.append("image", image);

      await fetch(`${linkSite}/api/posts/new`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTimeout(() => {
        history.push("/");
      }, 1500); // 1.5 seconds delay
    } catch (err) {
      setIsSubmitting;
    }
  };

  return (
    <div className="mt-[50px] mb-[60px] px-4 md:px-0">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
        <div className="bg-white border-4 border-neoBorder rounded-xl shadow-neoLg p-6 md:p-10 mb-20 relative z-10 w-full overflow-hidden">
          <h1 className="text-center font-black text-neoBorder text-[32px] mb-8 pb-4 border-b-4 border-neoBorder">Create New Post</h1>
          <div className="text-neoBorder">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              <div className="md:col-start-2 md:col-span-4">
                <Input
                  labelClass="block text-[18px] font-bold text-neoBorder mb-2"
                  label="Title"
                  type="text"
                  element="input"
                  id="headline"
                  className="mt-1 block w-full rounded-lg border-2 border-neoBorder bg-white shadow-sm text-neoBorder font-semibold placeholder:text-gray-500 focus:outline-none focus:shadow-[4px_4px_0px_#111827] h-[45px] transition-all duration-200 p-3"
                  onChange={getTitle}
                  placeholder="Enter post title"
                />
                {noTitleErrors && (
                  <p className="text-red-500 font-bold mt-2 bg-red-100 p-2 border-2 border-neoBorder rounded-md inline-block">
                    Please provide a title
                  </p>
                )}
              </div>

              <div className="md:col-start-2 md:col-span-4 rounded-lg bg-white p-4 shadow-neo border-2 border-neoBorder">
                <label className="block text-[18px] font-bold text-neoBorder mb-4">Post Content</label>
                <RTE description={getDescription} />
              </div>
              <div className="md:col-start-2 md:col-span-4 mt-4">
                <label className="block text-[18px] font-bold text-neoBorder mb-2">Category or Tag</label>
                <PostTagSelector
                  dropdownList={createPost_dropdownList}
                  getTag={getTag}
                />
                {noTagErrors && (
                   <p className="text-red-500 font-bold mt-2 bg-red-100 p-2 border-2 border-neoBorder rounded-md inline-block">
                    Please select a tag
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-8 border-t-4 border-dashed border-neoBorder pt-8">
              <ImageUpload onInput={imageHandler} />
            </div>
          </div>
          
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto min-w-[200px] justify-center text-center rounded-lg border-2 border-neoBorder bg-neoBlue py-3 px-8 text-[18px] font-bold text-neoBorder shadow-neo hover:shadow-neoHover hover:-translate-y-1 transition-all focus:outline-none focus:ring-0"
            >
              {isSubmitting ? "Submitting..." : "Create Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
