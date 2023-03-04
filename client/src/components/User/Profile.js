import React, { useState, useEffect, useRef, Fragment } from "react";
// import { AuthContext } from "../context/auth-context";
import LoadingSpinner from "../shared/LoadingSpinner";
const Max_Length_Of_Description = 100;
const Profile = () => {
  const [user, setUser] = useState();
  const userRef = useRef();
  const [userPosts, setUserPosts] = useState([]);
  const postsRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const taglineRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  //getting user id from session
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData.userId;

  useEffect(() => {
    const getUserDetail = async () => {
      const response = await fetch(
        `http://localhost:5000/api/user/profile/${userId}`
      );
      const data = await response.json();
      userRef.current = data;
      setUser(userRef.current);
    };
    getUserDetail();
  }, [userId]);

  useEffect(() => {
    const getPostsByUserId = async () => {
      const response = await fetch(
        `http://localhost:5000/api/posts/user/${userId}`
      );
      const data = await response.json();
      postsRef.current = data.posts;
      setUserPosts(postsRef.current);
    };
    getPostsByUserId();
  }, [userId]);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader(); // default js
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  if (!user) {
    return <LoadingSpinner />;
  }
  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setFile(false);
      fileIsValid = false;
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("tagline", taglineRef.current.value);
    formData.append("image", file);
    const response = await fetch(
      `http://localhost:5000/api/user/update/${userId}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    localStorage.setItem("userPhoto", data.profilePicture);
    window.location.reload();
  };
  if (userPosts.length === 0) {
    return <LoadingSpinner />;
  }

  // const userPhoto = localStorage.getItem("userPhoto");
  return (
    <div className="h-full bg-no-repeat">
      <form onSubmit={formSubmitHandler}>
        <div>
          <input
            type="file"
            ref={filePickerRef}
            style={{ display: "none" }}
            accept=".jpg, .png, .jpeg"
            onChange={pickedHandler}
          />
          <img
            src={previewUrl ? previewUrl : user.profilePicture}
            alt=""
            className="w-[200px] md:w-[250px] h-[250px] object-cover mx-auto rounded-full mt-[30px] md:mt-0"
          />
          <div className="flex justify-center">
            <button
              type="button"
              onClick={pickImageHandler}
              className="mt-[20px] text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-[150px]  px-5 py-2.5 text-center"
            >
              Change
            </button>
          </div>
        </div>
        <div className="md:w-[500px] md:mx-auto mt-[50px] ">
          <div className="relative z-0  mb-6 group">
            {/* <input
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label> */}
            <label
              htmlFor="name"
              className="text-white text-center block md:inline-block"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="block py-2.5 px-0 w-[300px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={user.name}
              ref={nameRef}
            />
          </div>

          <div className="relative z-0 md:w-full mb-6 ">
            <label
              htmlFor="email"
              className="text-white text-center block md:inline-block my-2 md:my-0"
            >
              Email Address
            </label>
            <input
              id="email"
              type="text"
              className="block py-2.5 px-0 w-[300px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={user.email}
              ref={emailRef}
            />
          </div>
          <div className="relative z-0 md:w-full mb-6">
            <label
              htmlFor="tagline"
              className="text-white text-center block my-2 md:my-0 md:inline-block"
            >
              Tagline
            </label>
            <input
              id="tagline"
              type="text"
              className="block py-2.5 px-0 w-[300px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={user.tagline}
              ref={taglineRef}
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
      <div className="mt-[20px] pt-[30px] text-white bg-black">
        <h2 className="text-center text-[24px] patrick-hand mb-[30px]">
          Your posts
        </h2>
        <ul className="md:flex md:flex-row md:justify-center md:mt-[60px] ">
          {userPosts.map(({ id, image, description, headline }) => {
            const imageUrl = `http://localhost:5000/${image.replace(
              /\\/g,
              "/"
            )}`;

            const shortDescription =
              description.slice(0, Max_Length_Of_Description) + "...";
            return (
              <Fragment key={id}>
                <li>
                  <div className="px-[20px] text  md:w-[300px]">
                    <div
                      className="h-48 rounded-lg text-center flex-none bg-cover mb-[10px]"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                      }}
                      title="Woman holding a mug"
                    ></div>
                    <div className="p-4 flex flex-col justify-between leading-normal">
                      <div className="mb-5">
                        {/* <p className="text-white flex items-center opacity-40">
                          {tag}
                        </p> */}
                        <div className="text-white mb-2 patrick-hand text-[20px]">
                          {headline}
                        </div>
                        <p className="text-white text-[16px] opacity-50">
                          {description.length > Max_Length_Of_Description
                            ? shortDescription
                            : description}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center md:hidden">
                      <button class="relative inline-flex items-center justify-center p-0.5 mb-[20px] mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
