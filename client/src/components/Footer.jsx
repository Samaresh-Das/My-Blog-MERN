import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative z-10">
      {" "}
      {/* WRAPPER to allow blob blending above footer */}
      {/* BLOBS placed relative to wrapper, not the footer itself */}
      <motion.div
        className="absolute -top-40 left-30 -translate-x-1/2 w-[300px]  lg:w-[500px] h-[220px] bg-violet-600 opacity-20 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          x: [0, 30, 20, 0],
          y: [0, -20, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-20 translate-x-1/2 w-[280px] lg:w-[450px] h-[200px] bg-pink-500 opacity-10 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          x: [0, 40, 30, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      {/* FOOTER stays inside the wrapper */}
      <footer className="relative backdrop-blur-xl bg-white/5 border-t border-purple-900/20 shadow-inner text-white mt-[60px] z-10">
        <div className="mx-auto w-full max-w-screen-xl px-6 py-8">
          <div className="md:flex md:justify-between">
            {/* Brand */}
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <img src="/Assets/blog.png" className="h-10 me-3" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  Sam's Blogs
                </span>
              </a>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 text-sm">
              {[
                {
                  title: "Links",
                  items: [
                    { label: "Contact Me", href: "/contact" },
                    { label: "About Me", href: "/about" },
                    { label: "Fun Quiz", href: "/quiz" },
                  ],
                },
                {
                  title: "Socials",
                  items: [
                    {
                      label: "GitHub",
                      href: "https://github.com/Samaresh-Das",
                    },
                    {
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/in/samaresh-d-ab9621212/",
                    },
                    {
                      label: "Instagram",
                      href: "https://www.instagram.com/samaresh.d/",
                    },
                  ],
                },
                {
                  title: "Legal",
                  items: [
                    { label: "Privacy", href: "/privacy" },
                    { label: "Terms", href: "/terms" },
                  ],
                },
              ].map((section, idx) => (
                <div key={idx}>
                  <h2 className="mb-6 font-semibold uppercase text-white/70">
                    {section.title}
                  </h2>
                  <ul className="text-white/50 space-y-2">
                    {section.items.map(({ label, href }) => (
                      <li key={label}>
                        {href.startsWith("http") ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#b951e2] hover:font-bold transition-colors duration-200"
                          >
                            {label}
                          </a>
                        ) : (
                          <Link
                            to={href}
                            className="hover:text-[#b951e2] hover:font-bold transition-colors duration-200"
                          >
                            {label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-6 border-purple-900/30" />

          <div className="sm:flex sm:items-center sm:justify-between text-white text-sm">
            <span>
              © {2025}{" "}
              <a href="/" className="hover:underline text-white/70">
                Sam's Blogs™
              </a>
              . All Rights Reserved.
            </span>
            {/* <div className="flex mt-4 sm:mt-0 gap-4">
              {[
                { label: "GitHub", icon: "🐱" },
                { label: "Discord", icon: "💬" },
                { label: "Twitter", icon: "🐦" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  title={item.label}
                >
                  <span className="text-lg">{item.icon}</span>
                </a>
              ))}
            </div> */}

            <div className="text-white/80 text-sm text-center sm:text-right">
              <span className="inline-flex items-center gap-1">
                Made with <span className="text-red-400 animate-pulse">❤️</span>{" "}
                by{" "}
                <span className="font-semibold text-white animate-pulse">
                  <a
                    href="https://portfolio-2-tau-sable.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:underline"
                  >
                    Samaresh
                  </a>
                </span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
