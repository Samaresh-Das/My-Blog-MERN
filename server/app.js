const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");

const postsRoute = require("./routes/posts-routes");
const usersRoute = require("./routes/user-routes");

const app = express();

app.use(bodyParser.json());

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

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  res.status(404).json({
    message: error.message || "An unknown error occurred",
  });
});

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://samaresh679:K4B3u9Uxj5JQ8g2c@blog.m9gbhjy.mongodb.net/devBlog?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
