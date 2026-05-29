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
      <title>Sam's Dev Blog — Web Development, DSA & DevOps</title>
      <meta
        name="description"
        content="Explore in-depth articles on frontend, backend, databases, DevOps, and data structures & algorithms. Written by a developer, for developers."
      />
    </Helmet>
    <App />
  </React.StrictMode>,
);
