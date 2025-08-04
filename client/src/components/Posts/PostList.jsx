import { Fragment, useState, useEffect, useRef, useContext } from "react";
import { linkSite } from "../linkSite";
import Card from "../shared/Card";
import LoadingSpinner from "../shared/LoadingSpinner";
import FeaturedPost from "./FeaturedPost";
import PostItems from "./PostItems";
import { motion } from "framer-motion";
import PostFilterTabs from "../shared/PostFilterTabs";
import FloatingCreateButton from "../shared/FloatingCreateButton ";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";
import NoPostFound from "../shared/NoPostFound";

const PostList = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [posts, setPosts] = useState([]);
  const dataRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("all");

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
      const response = await fetch(`${linkSite}/api/posts/`);
      const data = await response.json();
      dataRef.current = data; //if we don't use the data red the value will be lost after each render cycle or app restart, so we used ref for that
      setPosts(dataRef.current);
      setLoading(false);
    };
    getPosts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!posts) {
    setLoading(false);
    return <Card heading="Something wrong happened, Please check Later"></Card>;
  }

  // Filter posts if a category other than "all" is selected
  const filteredPosts =
    selectedTab === "all"
      ? posts
      : posts.filter((post) => post.category === selectedTab);

  if (posts.length === 0) {
    return <Card heading="No posts found here, Create One?">Create One?</Card>;
  }

  if (filteredPosts.length === 0) {
    return (
      <Fragment>
        <PostFilterTabs
          tabs={[
            { label: "All", value: "all" },
            { label: "Front-End", value: "frontend" },
            { label: "Back-End", value: "backend" },
            { label: "Database", value: "database" },
            { label: "DevOPS", value: "devops" },
            { label: "DSA", value: "dsa" },
          ]}
          onTabSelect={(tab) => setSelectedTab(tab)}
        />
        <div className="mt-24">
          <NoPostFound />
        </div>
      </Fragment>
    );
  }

  const postItems = !isDesktop
    ? filteredPosts.map(
        (
          {
            id,
            image,
            headline,
            profilePicture,
            creatorName,
            tagline,
            description,
            isLastItem,
          },
          index
        ) => {
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
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
            </motion.div>
          );
        }
      )
    : (selectedTab === "all" ? filteredPosts.slice(0, -1) : filteredPosts).map(
        (
          {
            id,
            image,
            headline,
            profilePicture,
            creatorName,
            tagline,
            description,
            isLastItem,
          },
          index
        ) => {
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
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
            </motion.div>
          );
        }
      );
  return (
    <Fragment>
      <PostFilterTabs
        tabs={[
          { label: "All", value: "all" },
          { label: "Front-End", value: "frontend" },
          { label: "Back-End", value: "backend" },
          { label: "Database", value: "database" },
          { label: "DevOPS", value: "devops" },
          { label: "DSA", value: "dsa" },
        ]}
        onTabSelect={(tab) => setSelectedTab(tab)}
      />
      {selectedTab === "all" && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FeaturedPost
            id={posts[posts.length - 1].id}
            image={posts[posts.length - 1].image}
            headline={posts[posts.length - 1].headline}
            description={posts[posts.length - 1].description}
            profilePicture={posts[posts.length - 1].profilePicture}
            creatorName={posts[posts.length - 1].creatorName}
            tagline={posts[posts.length - 1].tagline}
          />
        </motion.div>
      )}
      <ul className="md:flex md:flex-row md:flex-wrap md:justify-center lg:justify-normal md:mx-auto lg:mx-[100px] md:mt-[60px]">
        {postItems}
      </ul>

      {auth.isLoggedIn && <FloatingCreateButton />}
    </Fragment>
  );
};

export default PostList;
