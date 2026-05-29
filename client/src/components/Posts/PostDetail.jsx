import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import LoadingSpinner from "../shared/LoadingSpinner";
import { linkSite } from "../linkSite";
import SEOHead from "../shared/SEOHead";
import { SEO } from "../seoConfig";

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

  // Extract plain text from HTML for meta description (max 160 chars)
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = sanitizedDescription;
  const plainTextDesc = (tempDiv.textContent || tempDiv.innerText || "")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 160);

  // JSON-LD structured data for this blog post
  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: headline,
    description: plainTextDesc,
    image: image,
    datePublished: createdAt,
    dateModified: createdAt,
    author: {
      "@type": "Person",
      name: creatorName,
    },
    publisher: {
      "@type": "Organization",
      name: SEO.siteName,
      logo: {
        "@type": "ImageObject",
        url: SEO.defaultImage,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SEO.siteUrl}/post/${postId}`,
    },
  };

  const parseOptions = {
    replace: (domNode) => {
      if (domNode.name === "pre") {
        const isNested = domNode.parent && domNode.parent.name === "pre";
        if (isNested) return;

        // Try to find the language class in this node or its first child
        let classes = domNode.attribs?.class || "";
        if (domNode.children?.[0]?.name === "pre") {
          classes = domNode.children[0].attribs?.class || classes;
        }

        let language = "CODE";
        if (classes.includes("javascript") || classes.includes("js")) language = "JAVASCRIPT";
        else if (classes.includes("python")) language = "PYTHON";
        else if (classes.includes("html")) language = "HTML";
        else if (classes.includes("css")) language = "CSS";
        else if (classes.includes("cpp")) language = "C++";
        else if (classes.includes("java")) language = "JAVA";
        else if (classes.includes("typescript") || classes.includes("ts")) language = "TYPESCRIPT";

        const getRawCode = (nodes) => {
          return nodes.map(node => {
            if (node.type === "text") return node.data;
            if (node.type === "tag" && node.children) return getRawCode(node.children);
            return "";
          }).join("");
        };

        const rawCode = getRawCode(domNode.children);

        const highlightCode = (code) => {
          if (!code) return "";
          let h = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          
          h = h.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '<span class="str" style="color: #a5d6ff;">$&</span>');
          h = h.replace(/(\/\/.*)/g, '<span class="com" style="color: #8b949e;">$1</span>');
          h = h.replace(/\b(const|let|var|function|return|if|else|for|while|import|export|class|this|new|async|await|default|case|switch|break|continue)\b(?![^<]*>|[^<>]*<\/)/g, '<span class="kw" style="color: #ff7b72;">$1</span>');
          h = h.replace(/\b(\w+)(?=\()(?![^<]*>|[^<>]*<\/)/g, '<span class="fn" style="color: #d2a8ff;">$1</span>');
          h = h.replace(/\b(\d+)\b(?![^<]*>|[^<>]*<\/)/g, '<span class="num" style="color: #79c0ff;">$1</span>');

          // Clean up any nested spans created by overlapping patterns
          h = h.replace(/<span[^>]*>(<span[^>]*>.*?<\/span>.*?)<\/span>/g, '$1');

          return h;
        };


        const copyToClipboard = (e) => {
          navigator.clipboard.writeText(rawCode);
          const btn = e.currentTarget;
          const originalContent = btn.innerHTML;
          btn.innerHTML = "COPIED!";
          setTimeout(() => {
            btn.innerHTML = originalContent;
          }, 2000);
        };

        return (
          <div className="code-block-wrapper relative group my-12 bg-[#010409] border-4 border-neoBorder rounded-2xl shadow-neoLg overflow-hidden transition-all duration-500 hover:scale-[1.01]">
            <div className="code-window-header flex justify-between items-center px-5 py-3 bg-[#0d1117] border-b-4 border-neoBorder">
              <div className="flex items-center gap-5">
                <div className="code-window-dots flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border-2 border-neoBorder shadow-[1px_1px_0px_#111827]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border-2 border-neoBorder shadow-[1px_1px_0px_#111827]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border-2 border-neoBorder shadow-[1px_1px_0px_#111827]"></div>
                </div>
                <div className="text-[12px] text-gray-400 font-black uppercase tracking-[0.2em]">{language}</div>
              </div>
              <button 
                onClick={copyToClipboard}
                className="bg-neoYellow border-2 border-neoBorder px-4 py-1 rounded-md text-[12px] font-black text-neoBorder shadow-[3px_3px_0px_#111827] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#111827] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all uppercase"
              >
                COPY
              </button>
            </div>
            <div className="p-1 pb-2 px-2 bg-[#010409]">
              <div className="bg-[#0d1117] rounded-xl border-2 border-neoBorder/30 shadow-inner overflow-hidden">
                <pre className="text-[14px] md:text-[18px] p-6 pt-8 overflow-x-auto text-[#c9d1d9] font-mono leading-relaxed selection:bg-neoBlue/30">
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(rawCode) }} />
                </pre>
              </div>
            </div>
          </div>
        );
      }
    },
  };

  return (
    <Fragment>
      <SEOHead
        title={headline}
        description={plainTextDesc}
        url={`/post/${postId}`}
        image={image}
        type="article"
        jsonLd={blogPostJsonLd}
        publishedTime={createdAt}
        author={creatorName}
      />
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
