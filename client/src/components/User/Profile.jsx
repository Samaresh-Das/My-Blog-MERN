import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import { AuthContext } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import LoadingSpinner from "../shared/LoadingSpinner";
import Card from "../shared/Card";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import { linkSite } from "../linkSite";
import { shortingDesc } from "../Posts/shortDesc";

const Profile = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [hover, setHover] = useState();
  const [modal, setModal] = useState(false);

  const [file, setFile] = useState();

  const userRef = useRef();
  const postsRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const taglineRef = useRef();

  const history = useHistory();

  const filePickerRef = useRef();
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  //getting user id from session
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData.userId;
  useEffect(() => {
    const getUserDetail = async () => {
      const response = await fetch(`${linkSite}/api/user/profile/user`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      const data = await response.json();
      userRef.current = data;
      setUser(userRef.current);
    };
    getUserDetail();
  }, [auth.token]);

  useEffect(() => {
    const getPostsByUserId = async () => {
      const response = await fetch(`${linkSite}/api/posts/user/${userId}`);
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
      // eslint-disable-next-line
      fileIsValid = false;
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("tagline", taglineRef.current.value);
    if (file) {
      formData.append("image", file);
    }

    const response = await fetch(`${linkSite}/api/user/update`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    const data = await response.json();
    localStorage.setItem("userPhoto", data.profilePicture);
    history.push("/profile");
  };

  const postDeleteHandler = async (postId) => {
    await fetch(`${linkSite}/api/posts/del/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    window.location.reload();
  };

  const modalOpenHandler = () => {
    setModal(true);
  };
  const modalCloseHandler = () => {
    setModal(false);
  };
  // const userPhoto = localStorage.getItem("userPhoto");
  return (
    <div className="h-full bg-no-repeat">
      {modal && <Modal onClose={modalCloseHandler} />}
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
            <Button
              type="button"
              onClick={pickImageHandler}
              className="mt-[20px] w-[150px] px-5 py-2.5 text-center"
            >
              Change
            </Button>
          </div>
        </div>
        <div className="md:w-[500px] md:mx-auto mt-[50px] ">
          <div className="relative z-0  mb-6 group">
            <Input
              labelClass="text-white w-[280px] md:w-auto mx-auto md:text-center block md:inline-block"
              label="Name"
              type="text"
              element="input"
              id="name"
              className="block py-2.5 px-0 w-[280px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={user.name}
              ref={nameRef}
            />
          </div>

          <div className="relative z-0 md:w-full mb-6 ">
            <Input
              labelClass="text-white w-[280px] md:w-auto mx-auto md:text-center block md:inline-block"
              label="Email Address"
              type="text"
              element="input"
              id="email"
              className="block py-2.5 px-0 w-[280px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={user.email}
              ref={emailRef}
            />
          </div>
          <div className="relative z-0 md:w-full mb-6">
            <Input
              labelClass="text-white w-[280px] md:w-auto mx-auto md:text-center block md:inline-block"
              label="Tagline"
              type="text"
              element="input"
              id="tag"
              className="block py-2.5 px-0 w-[280px] mx-auto md:mx-0 md:w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={user.tagline}
              ref={taglineRef}
            />
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              type="submit"
              className="w-[150px] px-5 py-2.5 text-center mb-[30px] md:mb-0"
            >
              Update
            </Button>
            <button
              className="w-[150px] px-5 py-2.5 text-center mb-[30px] md:mb-0 font-semibold text-sm rounded-2xl 
    text-red-300 border border-red-400/60 bg-red-500/5 
    hover:bg-red-500/20 hover:text-red-100 
    hover:shadow-lg hover:shadow-red-500/30 
    transition-all duration-200 ease-in-out 
    backdrop-blur-md focus:outline-none"
              type="button"
              onClick={modalOpenHandler}
            >
              Delete Account
            </button>
          </div>
        </div>
      </form>
      <div className="mt-[20px] pt-[30px] text-white bg-white/5 backdrop-blur-xl mx-5 md:mx-10 rounded-2xl ">
        <h2 className="text-center text-[24px] patrick-hand mb-[30px]">
          Your posts
        </h2>
        <ul className="md:flex md:flex-row md:justify-center md:flex-wrap md:mt-[60px] md:space-x-4">
          {!userPosts ? (
            <Card heading="No posts found for you, Create One?">
              Create One?
            </Card>
          ) : (
            userPosts.map(({ id, image, description, headline }) => {
              const {
                textContent,
                shortDescription,
                Max_Length_Of_Description,
              } = shortingDesc(description);
              return (
                <Fragment key={id}>
                  <li
                    onMouseEnter={() => setHover(id)}
                    onMouseLeave={() => setHover()}
                  >
                    <div
                      className={`${
                        hover === id ? "opacity-70" : ""
                      } group p-5 text border border-purple-900 md:border-none rounded-lg md:rounded-none shadow-lg md:shadow-none mb-[30px] md:mb-0 transition-all duration-300 ease-in-out md:hover:scale-100 md:relative md:w-[300px] w-auto mx-4 md:mx-0`}
                    >
                      <div
                        className="h-48 rounded-lg text-center flex-none bg-cover bg-center mb-[10px]"
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                        title="Woman holding a mug"
                      ></div>
                      <div className="p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-5">
                          <div className="text-white mb-2 patrick-hand text-[20px]">
                            {headline}
                          </div>
                          <p className="text-white text-[16px] opacity-50">
                            {textContent.length > Max_Length_Of_Description
                              ? shortDescription
                              : textContent}
                          </p>
                        </div>
                        {/* Delete Button — clearer, bolder */}
                        <button
                          className="hidden md:block absolute md:top-1/2 md:left-3/4 md:-translate-x-3/4 md:-translate-y-1/2 md:px-4 md:py-1.5 md:rounded-xl md:bg-red-600/80 md:text-white md:opacity-0 md:transition-all md:duration-300 md:ease-out md:group-hover:opacity-100 md:group-hover:-translate-y-full md:shadow-md md:hover:bg-red-700"
                          onClick={() => postDeleteHandler(id)}
                        >
                          Delete
                        </button>

                        {/* Update Button — vibrant violet */}
                        <Link
                          to={`/update/${id}`}
                          className="hidden md:block absolute top-1/2 left-1/4 -translate-x-1/4 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-violet-600/80 text-white opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-full shadow-md hover:bg-violet-700"
                        >
                          Update
                        </Link>
                      </div>
                      <div className="flex justify-center gap-4 md:hidden mb-5">
                        {/* Delete Button */}
                        <button
                          className="px-5 py-2.5 rounded-xl font-medium text-sm text-red-300 bg-red-600/10 border border-red-600 hover:bg-red-600/30 hover:text-white transition-all duration-200 ease-in-out shadow-md"
                          onClick={() => postDeleteHandler(id)}
                        >
                          Delete
                        </button>

                        {/* Update Button */}
                        <Link
                          to={`/update/${id}`}
                          className="px-5 py-2.5 rounded-xl font-medium text-sm text-violet-300 bg-violet-600/10 border border-violet-600      hover:bg-violet-600/30 hover:text-white transition-all duration-200 ease-in-out shadow-md"
                        >
                          Update
                        </Link>
                      </div>
                    </div>
                  </li>
                </Fragment>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
