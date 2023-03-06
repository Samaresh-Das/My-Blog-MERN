const { mongoose } = require("mongoose");
const HttpError = require("../models/http-error");
const Post = require("../models/post");
const User = require("../models/user");
const fs = require("fs");

const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find().populate(
      "creator",
      "name profilePicture tagline"
    );
  } catch (err) {
    const error = new HttpError("An unknown error occured", 500);
    return res.status(500).json({
      message: error.message || "An unknown error occurred",
    });
  }

  const postList = posts.map((post) => {
    //to get the details of the user
    const { id, headline, description, tag, creator, image } = post;
    const { name, profilePicture, tagline } = creator;
    return {
      id,
      headline,
      description,
      tag,
      creator: creator._id.toString(),
      creatorName: name,
      profilePicture,
      tagline,
      image,
    }; // Include user name in response
  });

  // console.log(postList);

  res.status(200).json(postList);
};

const getPostsById = async (req, res, next) => {
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId).populate(
      "creator",
      "name profilePicture tagline"
    );
  } catch (err) {
    const error = new HttpError("Cannot find the selected post", 500);
    return res.status(500).json({
      message: error.message || "Cannot find the selected post",
    });
  }

  if (!post) {
    const error = new HttpError("Could not find the post", 404);
    return res.status(500).json({
      message: error.message || "Cannot find the selected post",
    });
  }
  //to get the details of the user
  const { id, headline, description, tag, creator, createdAt, image } = post;
  const { name, profilePicture, tagline } = creator;
  const postData = {
    id,
    headline,
    description,
    createdAt,
    tag,
    creator: creator._id.toString(),
    creatorName: name,
    profilePicture,
    tagline,
    image,
  }; // Include user name in response

  res.status(200).json({
    post: postData,
  });
};

const getPostsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userWithPost;
  try {
    userWithPost = await User.findById(userId).populate("posts"); //checking the posts with field with the specified users id
  } catch (err) {
    const error = new HttpError("Could not find the post with this user", 500);
    return res.status(500).json({
      message: error.message || "Could not find the post with this user",
    });
  }

  if (!userWithPost || userWithPost.posts.length === 0) {
    const error = new HttpError("Could not find any posts with this user", 404);
    return res.status(500).json({
      message: error.message || "Cannot find any posts with this user",
    });
  }

  res.status(200).json({
    posts: userWithPost.posts.map((post) => post.toObject({ getters: true })),
  });
};

const createPosts = async (req, res, next) => {
  const { headline, description, creator, tag } = req.body; //get the required details from the body
  console.log(headline, description, creator, tag);
  let createdPost;
  try {
    createdPost = new Post({
      headline,
      description,
      creator,
      tag,
      image: req.file.path,
    }); //create new post. You need to save later

    // await createdPost.save();
  } catch (err) {
    const error = new HttpError("Posts creation failed", 500);
    return next(error);
  }

  let user;
  try {
    user = await User.findById(creator); //finding if the user exists in the db for the provided id
  } catch (err) {
    const error = new HttpError("Posts creation failed", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find the user for the provided id",
      500
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({ session: sess }); //saving the post if all goes well
    user.posts.push(createdPost); //pushing the post id in the user posts array
    await user.save({ session: sess }); //saving the user.
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Posts creation failed", 500);
    return next(error);
  }

  res.status(201).json({
    post: createdPost,
  });
};

const deletePost = async (req, res, next) => {
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId).populate("creator");
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Could not find this post", 500);
    return next(error);
  }

  if (post.creator.id !== req.userData.userId) {
    const error = new HttpError("You are not allowed to do that", 401);
    return next(error);
  }

  const imagePath = post.image;

  let deletedPost;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    deletedPost = await post.remove({ session: sess });
    post.creator.posts.pull(post);
    await post.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not delete the post", 500);
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({
    message: "Deleted",
    deletedPost: deletedPost.toObject({ getters: true }),
  });
};

module.exports = {
  getPosts,
  getPostsById,
  getPostsByUserId,
  createPosts,
  deletePost,
};
