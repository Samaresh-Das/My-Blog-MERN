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
import Button from "../shared/Button";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import { linkSite } from "../linkSite";
import { shortingDesc } from "../Posts/shortDesc";
import NoPostFound from "../shared/NoPostFound";

const Profile = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [hover, setHover] = useState();
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

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
      const sortedPosts = data.posts ? [...data.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
      postsRef.current = sortedPosts;
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

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts ? userPosts.slice(indexOfFirstPost, indexOfLastPost) : [];
  const totalPages = userPosts ? Math.ceil(userPosts.length / postsPerPage) : 0;

  // const userPhoto = localStorage.getItem("userPhoto");
  return (
    <div className="relative max-w-5xl mx-auto px-5 mt-10">
      {modal && <Modal onClose={modalCloseHandler} />}
      <form onSubmit={formSubmitHandler} className="bg-white border-4 border-neoBorder rounded-xl shadow-neoLg p-8 relative z-10 w-full mb-10 overflow-hidden">
        <h1 className="text-center font-black text-neoBorder text-[32px] mb-8 pb-4 border-b-4 border-neoBorder">Edit Profile</h1>
        <div className="flex flex-col md:flex-row md:items-start md:gap-x-12">
          <div className="flex flex-col items-center w-full md:w-1/3">
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
              className="w-[200px] md:w-[250px] h-[200px] md:h-[250px] object-cover rounded-xl border-4 border-neoBorder shadow-neo"
            />
            <div className="flex justify-center w-full mt-6">
              <Button
                type="button"
                onClick={pickImageHandler}
                className="w-full max-w-[200px]"
              >
                Change Photo
              </Button>
            </div>
          </div>
          
          <div className="flex-1 mt-10 md:mt-0 w-full">
            <div className="mb-6 relative">
              <Input
                labelClass="text-neoBorder font-bold text-[18px] mb-2 block"
                label="Name"
                type="text"
                element="input"
                id="name"
                className="w-full bg-white border-2 border-neoBorder text-neoBorder font-semibold p-3 rounded-lg outline-none focus:shadow-neo hover:shadow-neo transition-shadow placeholder:text-gray-500"
                placeholder={user.name}
                ref={nameRef}
              />
            </div>
            <div className="mb-6 relative">
              <Input
                labelClass="text-neoBorder font-bold text-[18px] mb-2 block"
                label="Email Address"
                type="text"
                element="input"
                id="email"
                className="w-full bg-white border-2 border-neoBorder text-neoBorder font-semibold p-3 rounded-lg outline-none focus:shadow-neo hover:shadow-neo transition-shadow placeholder:text-gray-500"
                placeholder={user.email}
                ref={emailRef}
              />
            </div>
            <div className="mb-10 relative">
              <Input
                labelClass="text-neoBorder font-bold text-[18px] mb-2 block"
                label="Tagline"
                type="text"
                element="input"
                id="tag"
                className="w-full bg-white border-2 border-neoBorder text-neoBorder font-semibold p-3 rounded-lg outline-none focus:shadow-neo hover:shadow-neo transition-shadow placeholder:text-gray-500"
                placeholder={user.tagline}
                ref={taglineRef}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                type="submit"
                className="w-full sm:w-[150px]"
              >
                Update
              </Button>
              <button
                className="w-full sm:w-[180px] px-5 py-2 text-center font-bold text-md rounded-lg 
      text-neoBorder border-2 border-neoBorder bg-neoPink
      shadow-neo hover:shadow-neoHover hover:-translate-y-1
      transition-all duration-300 ease-in-out focus:outline-none"
                type="button"
                onClick={modalOpenHandler}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </form>
      
      <div className="mt-16 bg-white border-4 border-neoBorder rounded-xl shadow-neoLg p-8 z-10 relative overflow-hidden">
        <h2 className="text-center font-black text-neoBorder text-[32px] mb-10 pb-4 border-b-4 border-neoBorder">Your posts</h2>
        <ul className="flex flex-col gap-8">
          {!userPosts || userPosts.length === 0 ? (
            <div className="w-full mb-[20px]">
              <NoPostFound />
            </div>
          ) : (
            currentPosts.map(({ id, image, description, headline }) => {
              const {
                textContent,
                shortDescription,
                Max_Length_Of_Description,
              } = shortingDesc(description);
              return (
                <Fragment key={id}>
                  <li className="list-none w-full group">
                    <div className="flex flex-col md:flex-row bg-white border-4 border-neoBorder rounded-xl shadow-neo hover:shadow-neoLg hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden w-full relative">
                      {/* Image Section */}
                      <div
                        className="h-56 md:h-auto md:w-[35%] border-b-4 md:border-b-0 md:border-r-4 border-neoBorder bg-cover bg-center flex-none"
                        style={{ backgroundImage: `url(${image})` }}
                        title={headline}
                      ></div>
                      
                      {/* Content Section */}
                      <div className="p-6 md:w-[65%] flex flex-col justify-between">
                        <div>
                          <h3 className="text-neoBorder font-black text-[24px] md:text-[28px] mb-3 leading-tight line-clamp-2">
                            {headline}
                          </h3>
                          <p className="text-gray-700 font-bold text-[16px] xl:text-[18px] line-clamp-3 mb-6">
                            {textContent.length > Max_Length_Of_Description
                              ? shortDescription
                              : textContent}
                          </p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                           <Link
                            to={`/update/${id}`}
                            className="flex-1 text-center py-3 bg-neoBlue border-2 border-neoBorder text-neoBorder font-black text-[16px] rounded-lg shadow-[4px_4px_0px_#111827] hover:translate-y-1 hover:shadow-[2px_2px_0px_#111827] transition-all"
                          >
                            Update Post
                          </Link>
                          <button
                            className="flex-1 text-center py-3 bg-neoPink border-2 border-neoBorder text-neoBorder font-black text-[16px] rounded-lg shadow-[4px_4px_0px_#111827] hover:translate-y-1 hover:shadow-[2px_2px_0px_#111827] transition-all"
                            onClick={() => postDeleteHandler(id)}
                          >
                            Delete Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </Fragment>
              );
            })
          )}
        </ul>

        {totalPages > 1 && (
          <div className="flex justify-center flex-wrap items-center gap-2 mt-12">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-4 py-2 text-neoBorder font-black border-2 border-neoBorder bg-white rounded-lg shadow-[4px_4px_0px_#111827] disabled:opacity-50 hover:bg-neoYellow hover:translate-y-1 hover:shadow-[2px_2px_0px_#111827] transition-all disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:shadow-[4px_4px_0px_#111827]"
            >Prev</button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 font-black border-neoBorder transition-all ${
                  currentPage === number ? 'bg-neoPink translate-y-1 shadow-[2px_2px_0px_#111827] text-neoBorder' : 'bg-white text-neoBorder shadow-[4px_4px_0px_#111827] hover:bg-neoYellow hover:translate-y-1 hover:shadow-[2px_2px_0px_#111827]'
                }`}
              >
                {number}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-4 py-2 text-neoBorder font-black border-2 border-neoBorder bg-white rounded-lg shadow-[4px_4px_0px_#111827] disabled:opacity-50 hover:bg-neoYellow hover:translate-y-1 hover:shadow-[2px_2px_0px_#111827] transition-all disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:shadow-[4px_4px_0px_#111827]"
            >Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
