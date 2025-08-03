require("dotenv").config({ path: "./.env" });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const rateLimit = require('express-rate-limit');

const HttpError = require("./models/http-error");

const postsRoute = require("./routes/posts-routes");
const usersRoute = require("./routes/user-routes");

const app = express();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 200 requests per windowMs
  standardHeaders: true, // send `RateLimit-*` headers
  legacyHeaders: false,  // disable `X-RateLimit-*` headers
  skip: (req, res) => req.path === '/ping', //keep the ping route unprotected for the cron job
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

// app.get("/places", (req, res, next) => {
//   res.json("server working");
// });
app.get("/ping", (req, res, next) => {
  res.json({ message: "Pong!" });
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
