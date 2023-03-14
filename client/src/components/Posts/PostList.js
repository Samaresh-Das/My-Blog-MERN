import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import Footer from "../Footer";
import NavItems from "../Navbar/NavItems";
import Card from "../shared/Card";
import LoadingSpinner from "../shared/LoadingSpinner";
const Max_Length_Of_Description = 100;

const PostList = ({ showNav }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [posts, setPosts] = useState([]);
  const dataRef = useRef(null);
  const [showSpinner, setShowSpinner] = useState(true);

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
      const response = await fetch(
        "https://dev-blog-p5s9.onrender.com/api/posts/"
      );
      const data = await response.json();
      dataRef.current = data; //if we don't use the data red the value will be lost after each render cycle or app restart, so we used ref for that
      setPosts(dataRef.current);
    };
    getPosts();
  }, []);

  useEffect(() => {
    // show the spinner for 3 sec and if no post found, show the card otherwise show the data
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSpinner) {
    return <LoadingSpinner />;
  }

  if (posts.length === 0) {
    return <Card heading="No posts found here, Create One?">Create One?</Card>;
  }

  const sanitizedDescription = DOMPurify.sanitize(posts[0].description);
  const div = document.createElement("div");
  div.innerHTML = sanitizedDescription;
  const textContent = div.textContent || div.innerText || "";
  const shortDescription =
    textContent.length > Max_Length_Of_Description
      ? textContent.slice(0, Max_Length_Of_Description) + "..."
      : textContent;

  const featuredPost = (
    <Link to={`/post/${posts[0].id}`}>
      <div className="hidden md:grid md:grid-cols-3 md:space-x-2 md:mx-[200px] md:mt-[60px] ">
        <img
          src={`https://dev-blog-p5s9.onrender.com/${posts[0].image}`}
          alt="banner"
          className="md:col-span-2 md:h-[450px] md:w-11/12 object-cover"
        />
        <div className="mb-8 ">
          {/* <p className="text-white flex items-center opacity-40">
            {posts[0].tag}
          </p> */}
          <div className="text-white mb-2 patrick-hand text-[20px] md:text-[30px]">
            {posts[0].headline}
          </div>
          <p className="text-white s text-[16px] opacity-50">
            {posts[0].description.length > Max_Length_Of_Description
              ? shortDescription
              : posts[0].description}
          </p>
          <div className="flex items-center mt-10">
            <img
              className="w-10 h-10 rounded-full mr-3 object-cover"
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
          const imageUrl = `https://dev-blog-p5s9.onrender.com/${image.replace(
            /\\/g,
            "/"
          )}`;
          const sanitizedDescription = DOMPurify.sanitize(description);
          const div = document.createElement("div");
          div.innerHTML = sanitizedDescription;
          const textContent = div.textContent || div.innerText || "";
          const shortDescription =
            textContent.length > Max_Length_Of_Description
              ? textContent.slice(0, Max_Length_Of_Description) + "..."
              : textContent;
          return (
            <Fragment key={id}>
              {showNav && <NavItems />}
              <li>
                <div className="px-[20px] text  md:w-[300px]">
                  <Link to={`/post/${id}`}>
                    <div
                      className="h-48 rounded-lg text-center flex-none bg-cover bg-center mb-[10px]"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                      }}
                      title={headline}
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
                          {textContent.length > Max_Length_Of_Description
                            ? shortDescription
                            : textContent}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <img
                          className="w-10 h-10 rounded-full mr-3 object-cover"
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
            const imageUrl = `https://dev-blog-p5s9.onrender.com/${image.replace(
              /\\/g,
              "/"
            )}`;

            const sanitizedDescription = DOMPurify.sanitize(description);
            const div = document.createElement("div");
            div.innerHTML = sanitizedDescription;
            const textContent = div.textContent || div.innerText || "";
            const shortDescription =
              textContent.length > Max_Length_Of_Description
                ? textContent.slice(0, Max_Length_Of_Description) + "..."
                : textContent;
            return (
              <Fragment key={id}>
                {showNav && <NavItems />}
                <li>
                  <div className="px-[20px] text  md:w-[300px]">
                    <Link to={`/post/${id}`}>
                      <div
                        className="h-48 rounded-lg text-center flex-none bg-cover bg-center bg-no-repeat mb-[10px]"
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
                            {textContent.length > Max_Length_Of_Description
                              ? shortDescription
                              : textContent}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 rounded-full mr-3 object-cover"
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
      <ul className="md:flex md:flex-row md:flex-wrap md:mx-[200px] md:mt-[60px] ">
        {postItems}
      </ul>
      <Footer />
    </Fragment>
  );
};

export default PostList;
