import React, { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import ImageUpload from "../shared/ImageUpload";

const CreatePost = () => {
  console.log("rendering");
  const { userId } = useContext(AuthContext);
  const history = useHistory();
  const [image, setImage] = useState();

  // const titleChange = useCallback((e) => {
  //   setTitle(e.target.value);
  //   // console.log(title);
  // }, []);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const tagRef = useRef();

  const imageHandler = (e) => {
    setImage(e);
    console.log(image);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("headline", titleRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("tag", tagRef.current.value);
      formData.append("image", image);
      formData.append("creator", userId);
      console.log([...formData.entries()]);
      const response = await fetch("http://localhost:5000/api/posts/new", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-[50px] md:mx-[10%] h-screen">
      <div className="md:grid md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 text-white">
            <h3 className="text-[20px] font-semibold leading-6 mb-5">
              Some info for text formatting
            </h3>
            <ul className="text-[16px] opacity-70 leading-loose">
              <li>*Italic*</li>
              <li>**Bold**</li>
              <li># Heading 1</li>
              <li>## Heading 2</li>
              <li>For Links - [Link](http://a.com)</li>
              <li> For Images - ![Image](http://url/a.png)</li>
              <li> For Blockquote - &gt; Blockquote</li>
              <li> For List "* List"</li>
              <li> Horizontal rule - _ _ _</li>
              <li> For `Inline code` with backticks</li>
              <li>
                {" "}
                For Code Bloc - <br /> ``` # code block <br /> print '3
                backticks or' <br />
                print 'indent 4 spaces' <br />
                ```
              </li>
            </ul>
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
                      className="mt-1 block w-full rounded-md  shadow-sm  sm:text-sm h-[40px] text-black"
                      ref={titleRef}
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[100px] text-black"
                      ref={descriptionRef}
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[40px] text-black"
                      ref={tagRef}
                    />
                  </div>
                </div>
                <ImageUpload onInput={imageHandler} />
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
