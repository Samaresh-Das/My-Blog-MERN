const { mongoose } = require("mongoose");
const HttpError = require("../models/http-error");
const Post = require("../models/post");
const User = require("../models/user");
const fs = require("fs");
const { validationResult } = require("express-validator");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccesskey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccesskey,
  },
  region: bucketRegion,
});

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
    const { id, headline, description, tag, category, creator, image } = post;
    const { name, profilePicture, tagline } = creator;
    return {
      id,
      headline,
      description,
      tag,
      category,
      creator: creator._id.toString(),
      creatorName: name,
      profilePicture,
      tagline,
      image,
    }; // Include user name in response
  });
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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  if (!req.file) {
    const error = new HttpError("Image file not provided", 400);
    return next(error.message);
  }

  const { headline, description, category } = req.body; //get the required details from the body
  const creator = req.userData.userId;
  let createdPost;
  try {
    //creating image file in s3 bucker
    const params = {
      Bucket: bucketName,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    createdPost = new Post({
      headline,
      description,
      creator,
      category,
      image: `https://sam-dev-blog.s3.ap-south-1.amazonaws.com/${req.file.originalname}`,
    }); //create new post. You need to save later



    // await createdPost.save();
  } catch (err) {
    const error = new HttpError("Posts creation failed", 500);
    console.error(error);
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

const updatePostById = async (req, res, next) => {
  const postId = req.params.pid;
  const { headline, description, tag } = req.body;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError("Post not found", 404);
    return next(error);
  }
  if (!post) {
    const error = new HttpError("Post not found", 404);
    return next(error);
  }

  if (post.creator.toString() !== req.userData.userId) {
    const error = new HttpError("You are not allowed to do that", 401);
    return next(error);
  }

  //the user might not want to update all the fields so we used the OR operator.
  post.headline = headline || post.headline;
  post.description = description || post.description;
  post.tag = tag || post.tag;

  let updatedPost;
  try {
    updatedPost = await post.save();
  } catch (err) {
    const error = new HttpError("Could not update the post", 500);
    return next(error);
  }
  res.status(200).json(updatedPost.toObject({ getters: true }));
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

  //deleting the post image from s3 bucket
  const imagePath = post.image.replace(
    "https://sam-dev-blog.s3.ap-south-1.amazonaws.com/",
    ""
  );
  const deleteParams = {
    Bucket: bucketName,
    Key: imagePath,
  };
  const deleteCommand = new DeleteObjectCommand(deleteParams);
  await s3.send(deleteCommand);

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
  updatePostById,
  deletePost,
};
