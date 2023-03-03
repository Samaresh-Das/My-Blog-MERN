import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import NavItems from "../Navbar/NavItems";
const Max_Length_Of_Description = 100;

const PostList = ({ showNav }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [posts, setPosts] = useState([]);
  const dataRef = useRef(null);

  // console.log("rendering...");
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Set breakpoint value for desktop/mobile
    };
    window.addEventListener("resize", handleResize);

    // Call handleResize on initial load
    handleResize();

    // Cleanup listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:5000/api/posts");
      const data = await response.json();
      dataRef.current = data; //if we don't use the data red the value will be lost after each render cycle or app restart, so we used ref for that
      setPosts(dataRef.current);
    };
    getPosts();
  }, []);

  if (posts.length === 0) {
    //loading spinner
    return (
      <div className="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const shortDescription =
    posts[0].description.slice(0, Max_Length_Of_Description) + "...";

  const featuredPost = (
    <Link to={`/post/${posts[0].id}`}>
      <div className="hidden md:grid md:grid-cols-3 md:space-x-2 md:mx-[200px] md:mt-[60px] ">
        <img
          src={`http://localhost:5000/${posts[0].image}`}
          alt="banner"
          className="md:col-span-2  md:h-[450px] md:w-11/12"
        />
        <div className="mb-8 ">
          {/* <p className="text-white flex items-center opacity-40">
            {posts[0].tag}
          </p> */}
          <div className="text-white mb-2 patrick-hand text-[20px] md:text-[30px]">
            {posts[0].headline}
          </div>
          <p className="text-white text-[16px] opacity-50">
            {posts[0].description.length > Max_Length_Of_Description
              ? shortDescription
              : posts[0].description}
          </p>
          <div className="flex items-center mt-10">
            <img
              className="w-10 h-10 rounded-full mr-3"
              src={posts[0].profilePicture}
              alt="Avatar of Jonathan Reinink"
            />
            <div className="text-sm">
              <p className="text-white leading-none">{posts[0].creatorName}</p>
              <p className="text-white opacity-50">{posts[0].tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  const postItems = !isDesktop
    ? posts.map(
        ({
          id,
          image,
          headline,
          profilePicture,
          creatorName,
          tagline,
          description,
          isLastItem,
        }) => {
          const imageUrl = `http://localhost:5000/${image.replace(/\\/g, "/")}`;
          const shortDescription =
            description.slice(0, Max_Length_Of_Description) + "...";
          return (
            <Fragment key={id}>
              {showNav && <NavItems />}
              <li>
                <div className="px-[20px] text  md:w-[300px]">
                  <Link to={`/post/${id}`}>
                    <div
                      className="h-48 rounded-lg text-center flex-none bg-cover mb-[10px]"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                      }}
                      title="Woman holding a mug"
                    ></div>
                    <div className="p-4 flex flex-col justify-between leading-normal">
                      <div className="mb-8">
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
                      <div className="flex items-center">
                        <img
                          className="w-10 h-10 rounded-full mr-3"
                          src={profilePicture}
                          alt="Avatar of Jonathan Reinink"
                        />
                        <div className="text-sm">
                          <p className="text-white leading-none">
                            {creatorName}
                          </p>
                          <p className="text-white opacity-50">{tagline}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                {!isLastItem && (
                  <hr className="mx-[30px] mb-[30px] border-2 border-gray-400 opacity-50 md:hidden" />
                )}
              </li>
            </Fragment>
          );
        }
      )
    : posts
        .slice(1)
        .map(
          ({
            id,
            image,
            headline,
            profilePicture,
            creatorName,
            tagline,
            description,
            isLastItem,
          }) => {
            const imageUrl = `http://localhost:5000/${image.replace(
              /\\/g,
              "/"
            )}`;

            const shortDescription =
              description.slice(0, Max_Length_Of_Description) + "...";
            return (
              <Fragment key={id}>
                {showNav && <NavItems />}
                <li>
                  <div className="px-[20px] text  md:w-[300px]">
                    <Link to={`/post/${id}`}>
                      <div
                        className="h-48 rounded-lg text-center flex-none bg-cover mb-[10px]"
                        style={{
                          backgroundImage: `url(${imageUrl})`,
                        }}
                        title="Woman holding a mug"
                      ></div>
                      <div className="p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
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
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 rounded-full mr-3"
                            src={profilePicture}
                            alt="Avatar of Jonathan Reinink"
                          />
                          <div className="text-sm">
                            <p className="text-white leading-none">
                              {creatorName}
                            </p>
                            <p className="text-white opacity-50">{tagline}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {!isLastItem && (
                    <hr className="mx-[30px] mb-[30px] border-2 border-gray-400 opacity-50 md:hidden" />
                  )}
                </li>
              </Fragment>
            );
          }
        );
  return (
    <Fragment>
      {featuredPost}
      <ul className="md:flex md:flex-row md:mx-[200px] md:mt-[60px] ">
        {postItems}
      </ul>
      <Footer />
    </Fragment>
  );
};

export default PostList;
