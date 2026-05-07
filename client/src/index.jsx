import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Tech Blog</title>
      <meta
        name="description"
        content="Explore full-stack tech articles, tutorials, and developer guides on a modern blog built for readability and discovery."
      />
      <meta
        name="keywords"
        content="tech blog, frontend, backend, devops, programming, tutorial, web development"
      />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Tech Blog" />
      <meta
        property="og:description"
        content="Explore full-stack tech articles, tutorials, and developer guides on a modern blog built for readability and discovery."
      />
      <meta property="og:image" content="/Assets/blog.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Tech Blog" />
      <meta
        name="twitter:description"
        content="Explore full-stack tech articles, tutorials, and developer guides on a modern blog built for readability and discovery."
      />
    </Helmet>
    <App />
  </React.StrictMode>,
);
