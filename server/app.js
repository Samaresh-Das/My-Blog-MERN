require("dotenv").config({ path: "./.env" });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const rateLimit = require('express-rate-limit');

const HttpError = require("./models/http-error");
const Post = require("./models/post");

const postsRoute = require("./routes/posts-routes");
const usersRoute = require("./routes/user-routes");
const sitemapRoute = require("./routes/sitemap-routes");

const app = express();

app.set('trust proxy', 1); // trust first proxy

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 200 requests per windowMs
  standardHeaders: true, // send `RateLimit-*` headers
  legacyHeaders: false,  // disable `X-RateLimit-*` headers
  skip: (req, res) => ['/ping', '/sitemap.xml', '/robots.txt'].includes(req.path), //keep ping + SEO routes unprotected
  message: "Too many requests, please try again later.",
});

app.use(globalLimiter);

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/posts", postsRoute);
app.use("/api/user", usersRoute);
app.use("/", sitemapRoute); // Sitemap & robots.txt — no auth required

// app.get("/places", (req, res, next) => {
//   res.json("server working");
// });
app.get("/ping", (req, res, next) => {
  res.json({ message: "Pong!CI/CD WORKING 🚀" });
});

app.get("/sitemap.xml", async (req, res, next) => {
  let posts = [];
  try {
    posts = await Post.find({}, "createdAt").sort({ createdAt: -1 });
  } catch (err) {
    return res.status(500).send("Unable to generate sitemap at this time.");
  }

  const hostUrl = `${req.protocol}://${req.get("host")}`;
  const staticUrls = [
    { loc: `${hostUrl}/`, priority: "1.0", changefreq: "daily" },
    { loc: `${hostUrl}/about`, priority: "0.8", changefreq: "weekly" },
    { loc: `${hostUrl}/contact`, priority: "0.8", changefreq: "weekly" },
    { loc: `${hostUrl}/privacy`, priority: "0.6", changefreq: "monthly" },
    { loc: `${hostUrl}/terms`, priority: "0.6", changefreq: "monthly" },
  ];

  const urlsXml = staticUrls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>`
    )
    .join("");

  const postsXml = posts
    .map(
      (post) => `
    <url>
      <loc>${hostUrl}/post/${post.id}</loc>
      <lastmod>${new Date(post.createdAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlsXml}
  ${postsXml}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  // if (req.file) {
  //   //deleting the image if any error happens or rolling it back
  //   fs.unlink(req.file.path, (err) => {
  //     console.log(err);
  //   });
  // }
  // if (res.headerSent) {
  //   return next(error);
  // }
  res.status(error.code || 500).json({
    message: error.message || "An unknown error occurred",
  });
});

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
