import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const titleChange = (e) => {
    setTitle(e.target.value);
    // console.log(title);
  };
  const descriptionChange = (e) => {
    setDescription(e.target.value);
    // console.log(description);
  };
  const tagChange = (e) => {
    setTag(e.target.value);
    // console.log(tag);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          headline: title,
          description,
          creator: "63ff692d913cd115b1efc996",
          tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-[100px] md:mx-[10%] ">
      <div className="md:grid md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 text-white">
            <h3 className="text-base font-semibold leading-6">
              Personal Information
            </h3>
            <p className="mt-1 text-sm">
              Use a permanent address where you can receive mail.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className=" drop-shadow-xl sm:rounded-md ">
              <div className=" text-white sm:p-6 ">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-4 md:col-span-5">
                    <label
                      htmlFor="headline"
                      className="block text-sm font-medium"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="headline"
                      id="headline"
                      className="mt-1 block w-full rounded-md  shadow-sm  sm:text-sm h-[40px]"
                      onChange={titleChange}
                    />
                  </div>

                  <div className="col-span-4 md:col-span-5">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-white"
                    >
                      Post Content
                    </label>
                    <textarea
                      rows="7"
                      type="textarea"
                      name="description"
                      id="description"
                      autoComplete="street-address"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[150px] text-black"
                      onChange={descriptionChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="tag"
                      className="block text-sm font-medium text-white"
                    >
                      Tag
                    </label>
                    <input
                      type="text"
                      name="tag"
                      id="tag"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[40px]"
                      onChange={tagChange}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 flex justify-center sm:px-6">
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
      </div>
    </div>
  );
};

export default CreatePost;
