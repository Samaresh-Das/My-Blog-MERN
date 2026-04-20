import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ onUnsupportedClick, unsupportedRoutes }) => {
  return (
    <footer className="border-t-4 border-neoBorder bg-white text-neoBorder">
      <div className="mx-auto w-full max-w-screen-xl px-8 py-12">
        <div className="md:flex md:justify-between md:gap-12">
          {/* Brand */}
          <div className="mb-10 md:mb-0">
            <a href="/" className="flex items-center gap-3">
              <img
                src="/Assets/blog.png"
                className="h-12 border-2 border-neoBorder rounded-md shadow-neo"
                alt="Logo"
              />
              <span className="text-2xl font-black text-neoBorder">
                Sam's Blogs
              </span>
            </a>
            <p className="mt-4 text-gray-600 font-semibold max-w-xs text-sm leading-relaxed">
              A personal blog covering tech, life, and everything in between.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
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
                <h2 className="mb-5 font-black text-neoBorder uppercase text-sm tracking-widest border-b-2 border-neoBorder pb-2">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.items.map(({ label, href }) => (
                    <li key={label}>
                      {href.startsWith("http") ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-600 hover:text-neoBorder hover:underline transition-all"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          to={href}
                          onClick={(e) => {
                            if (unsupportedRoutes.includes(href)) {
                              onUnsupportedClick(e, href);
                            }
                          }}
                          className="font-semibold text-gray-600 hover:text-neoBorder hover:underline transition-all"
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

        <hr className="my-8 border-2 border-neoBorder" />

        <div className="sm:flex sm:items-center sm:justify-between gap-4">
          <span className="font-bold text-neoBorder text-sm">
            © {2025}{" "}
            <a href="/" className="hover:underline">
              Sam's Blogs™
            </a>
            . All Rights Reserved.
          </span>
          <div className="text-sm mt-4 sm:mt-0">
            <span className="inline-flex items-center gap-1 font-semibold text-gray-600">
              Made with <span className="text-red-500">❤️</span> by{" "}
              <a
                href="https://portfolio-2-tau-sable.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-neoBorder border-b-2 border-neoBorder hover:bg-neoYellow px-1 transition-all"
              >
                Samaresh
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
