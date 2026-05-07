import { Fragment, useState, useEffect, useContext } from "react";
import { linkSite } from "../linkSite";
import Card from "../shared/Card";
import LoadingSpinner from "../shared/LoadingSpinner";
import FeaturedPost from "./FeaturedPost";
import PostItems from "./PostItems";
import { motion } from "framer-motion";
import PostFilterTabs from "../shared/PostFilterTabs";
import FloatingCreateButton from "../shared/FloatingCreateButton";
import { AuthContext } from "../context/auth-context";
import NoPostFound from "../shared/NoPostFound";
import { SearchContext } from "../context/SearchContext";

const PAGE_SIZE = 6;

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-12">
      <button
        className="px-4 py-2 rounded-full border-2 border-neoBorder bg-white text-neoBorder font-bold transition hover:bg-neoBg disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-full border-2 border-neoBorder font-bold transition ${
            page === currentPage
              ? "bg-neoBorder text-white"
              : "bg-white text-neoBorder hover:bg-neoBg"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-4 py-2 rounded-full border-2 border-neoBorder bg-white text-neoBorder font-bold transition hover:bg-neoBg disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

const PostList = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const auth = useContext(AuthContext);
  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, searchQuery]);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const effectiveLimit =
          selectedTab === "all" &&
          searchQuery.trim() === "" &&
          currentPage === 1
            ? PAGE_SIZE + 1
            : PAGE_SIZE;
        let query = `?page=${currentPage}&limit=${effectiveLimit}`;
        if (selectedTab && selectedTab !== "all") {
          query += `&category=${encodeURIComponent(selectedTab)}`;
        }
        if (searchQuery.trim() !== "") {
          query += `&search=${encodeURIComponent(searchQuery.trim())}`;
        }

        const response = await fetch(`${linkSite}/api/posts/${query}`);
        const data = await response.json();
        const postsPayload = Array.isArray(data) ? data : data.posts || [];
        const sortedPosts = [...postsPayload].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        const totalPosts =
          typeof data.totalPosts === "number"
            ? data.totalPosts
            : Array.isArray(data)
              ? data.length
              : sortedPosts.length;

        setPosts(sortedPosts);
        setTotalPages(Math.max(1, Math.ceil(totalPosts / PAGE_SIZE)));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getPosts();
  }, [currentPage, selectedTab, searchQuery]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!posts) {
    return <Card heading="Something wrong happened, please try again later." />;
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <PostFilterTabs
          tabs={[
            { label: "All", value: "all" },
            { label: "Front-End", value: "frontend" },
            { label: "Back-End", value: "backend" },
            { label: "Database", value: "database" },
            { label: "DevOPS", value: "devops" },
            { label: "DSA", value: "dsa" },
          ]}
          selectedTab={selectedTab}
          onTabSelect={(tab) => setSelectedTab(tab)}
        />
        <div className="mt-16">
          <NoPostFound />
        </div>
      </div>
    );
  }

  const featuredPost =
    selectedTab === "all" && searchQuery.trim() === "" && posts.length > 0
      ? posts[0]
      : null;
  const displayPosts = featuredPost ? posts.slice(1) : posts;

  const postItems = displayPosts.map(
    (
      {
        id,
        image,
        headline,
        profilePicture,
        creatorName,
        tagline,
        description,
        createdAt,
      },
      index,
    ) => (
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.08 }}
      >
        <PostItems
          id={id}
          image={image}
          headline={headline}
          description={description}
          profilePicture={profilePicture}
          creatorName={creatorName}
          tagline={tagline}
          createdAt={createdAt}
        />
      </motion.div>
    ),
  );

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <PostFilterTabs
        tabs={[
          { label: "All", value: "all" },
          { label: "Front-End", value: "frontend" },
          { label: "Back-End", value: "backend" },
          { label: "Database", value: "database" },
          { label: "DevOPS", value: "devops" },
          { label: "DSA", value: "dsa" },
        ]}
        selectedTab={selectedTab}
        onTabSelect={(tab) => setSelectedTab(tab)}
      />

      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FeaturedPost
            id={featuredPost.id}
            image={featuredPost.image}
            headline={featuredPost.headline}
            description={featuredPost.description}
            profilePicture={featuredPost.profilePicture}
            creatorName={featuredPost.creatorName}
            tagline={featuredPost.tagline}
            createdAt={featuredPost.createdAt}
          />
        </motion.div>
      )}

      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-stretch mt-10">
        {postItems}
      </ul>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {auth.isLoggedIn && <FloatingCreateButton />}
    </div>
  );
};

export default PostList;
