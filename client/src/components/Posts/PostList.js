import React, { Fragment, useState, useEffect, useRef } from "react";
import Footer from "../Footer";
import Card from "../shared/Card";
import LoadingSpinner from "../shared/LoadingSpinner";
import FeaturedPost from "./FeaturedPost";
import PostItems from "./PostItems";

const PostList = ({ showNav }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [posts, setPosts] = useState([]);
  const dataRef = useRef(null);
  // const [showSpinner, setShowSpinner] = useState(true);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };
    getPosts();
  }, []);

  // useEffect(() => {
  //   // show the spinner for 3 sec and if no post found, show the card otherwise show the data
  //   const timer = setTimeout(() => {
  //     setShowSpinner(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!posts) {
    setLoading(false);
    return <Card heading="Something wrong happened, Please check Later"></Card>;
  }

  if (posts.length === 0) {
    return <Card heading="No posts found here, Create One?">Create One?</Card>;
  }

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
          return (
            <PostItems
              key={id}
              id={id}
              image={image}
              headline={headline}
              description={description}
              profilePicture={profilePicture}
              creatorName={creatorName}
              tagline={tagline}
              isLastItem={isLastItem}
            />
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
            return (
              <PostItems
                key={id}
                id={id}
                image={image}
                headline={headline}
                description={description}
                profilePicture={profilePicture}
                creatorName={creatorName}
                tagline={tagline}
                isLastItem={isLastItem}
              />
            );
          }
        );
  return (
    <Fragment>
      <FeaturedPost
        id={posts[0].id}
        image={posts[0].image}
        headline={posts[0].headline}
        description={posts[0].description}
        profilePicture={posts[0].profilePicture}
        creatorName={posts[0].creatorName}
        tagline={posts[0].tagline}
      />
      <ul className="md:flex md:flex-row md:flex-wrap md:mx-[200px] md:mt-[60px] ">
        {postItems}
      </ul>
      <Footer />
    </Fragment>
  );
};

export default PostList;
