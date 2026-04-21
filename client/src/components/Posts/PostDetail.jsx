import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import LoadingSpinner from "../shared/LoadingSpinner";
import { linkSite } from "../linkSite";

const PostDetail = () => {
  const [postDetails, setPostDetails] = useState({ post: {} });
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  // const dataRef = useRef(null);

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`${linkSite}/api/posts/${postId}`);
      const data = await response.json();
      // dataRef.current = data; //if we don't use the data red the value will be lost after each render cycle or app restart, so we used ref for that
      // setPosts(dataRef.current);
      setPostDetails(data);
      setIsLoading(false);
    };
    getPost();
  }, [postId]);

  if (isLoading) {
    //loading spinner
    return <LoadingSpinner />;
  }

  const {
    createdAt,
    creatorName,
    description,
    headline,
    profilePicture,
    tagline,
    tag,
    image,
  } = postDetails.post;

  const dateString = createdAt;
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const sanitizedDescription = DOMPurify.sanitize(description);

  const parseOptions = {
    replace: (domNode) => {
      if (domNode.name === "pre") {
        const isNested = domNode.parent && domNode.parent.name === "pre";
        if (isNested) return;

        // Try to find the language class in this node or its first child (if it's another pre)
        let classes = domNode.attribs?.class || "";
        if (domNode.children?.[0]?.name === "pre") {
          classes = domNode.children[0].attribs?.class || classes;
        }

        let language = "Code";
        if (classes.includes("javascript") || classes.includes("js")) language = "JavaScript";
        else if (classes.includes("python")) language = "Python";
        else if (classes.includes("html")) language = "HTML";
        else if (classes.includes("css")) language = "CSS";
        else if (classes.includes("cpp")) language = "C++";
        else if (classes.includes("java")) language = "Java";
        else if (classes.includes("typescript") || classes.includes("ts")) language = "TypeScript";

        const copyToClipboard = (e) => {
          const pre = e.currentTarget.closest(".code-block-wrapper").querySelector("pre");
          const text = pre.innerText;
          navigator.clipboard.writeText(text);
          const btn = e.currentTarget;
          const originalContent = btn.innerHTML;
          btn.innerHTML = "Copied!";
          setTimeout(() => {
            btn.innerHTML = originalContent;
          }, 2000);
        };

        return (
          <div className="code-block-wrapper relative group my-10 bg-[#1e1e1e] border-4 border-neoBorder rounded-xl shadow-neo overflow-hidden transition-all duration-300">
            <div className="code-window-header flex justify-between items-center px-4 py-3 bg-[#2d2d2d] border-b-2 border-neoBorder">
              <div className="flex items-center gap-4">
                <div className="code-window-dots flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">{language}</div>
              </div>
              <button 
                onClick={copyToClipboard}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white border-2 border-neoBorder px-3 py-1 rounded-md text-[12px] font-bold shadow-[2px_2px_0px_rgba(17,24,39,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                Copy
              </button>
            </div>
            <pre {...domNode.attribs} className={`${domNode.attribs?.class || ""} text-[15px] p-6 overflow-x-auto !bg-transparent`}>
              {domToReact(domNode.children, parseOptions)}
            </pre>
          </div>
        );
      }
    },
  };

  return (
    <Fragment>
      <div className="h-full relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex flex-row justify-center text-[18px]">
            <h1 className="mt-[30px] text-neoBorder opacity-70 font-bold border-2 border-neoBorder px-4 py-1 rounded-full bg-neoPink shadow-[3px_3px_0px_rgba(17,24,39,1)]">
              {tag} &#8226; {formattedDate}
            </h1>
          </div>
          <div className="mt-8 text-neoBorder font-black text-[32px] md:text-[48px] leading-tight text-center mx-[20px] max-w-4xl lg:mx-auto">
            {headline}
          </div>
          <div className="flex items-center justify-center mt-10">
            <div className="flex items-center p-3 border-2 border-neoBorder rounded-xl bg-neoYellow shadow-neo">
              <img
                className="w-[60px] h-[60px] rounded-full mr-4 object-cover border-2 border-neoBorder shadow-inner"
                src={profilePicture}
                alt={`Avatar of ${creatorName}`}
              />
              <div className="text-sm">
                <p className="text-neoBorder leading-none text-[18px] font-bold">
                  {creatorName}
                </p>
                <p className="text-gray-800 font-semibold mt-2 text-[16px]">{tagline}</p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-[40px] px-[20px] md:px-[80px] pt-[30px] pb-[50px] bg-white rounded-xl shadow-neoLg border-4 border-neoBorder md:mx-8 lg:mx-20 mb-20"
        >
          <img
            src={image}
            alt="cover"
            className="mx-auto mt-[20px] md:mt-[40px] mb-10 w-[90%] lg:w-[80%] h-[200px] lg:h-[594px] object-cover rounded-xl shadow-neo border-4 border-neoBorder"
          />

          <div className="text-neoBorder font-medium text-left w-[90%] md:w-[80%] mx-auto mt-[10px] md:text-[22px] leading-relaxed htmlParsed">
            {parse(sanitizedDescription.toString(), parseOptions)}
          </div>
        </motion.div>
      </div>
    </Fragment>
  );
};

export default PostDetail;
