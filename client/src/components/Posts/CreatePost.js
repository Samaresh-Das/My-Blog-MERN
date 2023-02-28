import React, { useState } from "react";

const CreatePost = () => {
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
          creator: "63f74dc69f480bba7aaf412a",
          tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10 sm:mt-0 md:mx-[10px] h-4/5">
      <div className="md:grid md:grid-cols-3  min-h-full">
        <div className="md:col-span-1 bg-[#292946]">
          <div className="px-4 sm:px-0 text-white">
            <h3 className="text-base font-semibold leading-6">
              Personal Information
            </h3>
            <p className="mt-1 text-sm">
              Use a permanent address where you can receive mail.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" onSubmit={handleSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="headline"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="headline"
                      id="headline"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[40px]"
                      onChange={titleChange}
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Post Content
                    </label>
                    <textarea
                      rows="7"
                      type="textarea"
                      name="description"
                      id="description"
                      autoComplete="street-address"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[40px]"
                      onChange={descriptionChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="tag"
                      className="block text-sm font-medium text-gray-700"
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
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
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
