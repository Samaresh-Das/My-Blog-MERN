import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Helmet } from "react-helmet";
import BackgroundBlobs from "./components/BackgroundBlobs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Tech Blog</title>
    </Helmet>
    <App />
  </React.StrictMode>
);
