const HttpError = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Post = require("../models/post");
const fs = require("fs");
const mongoose = require("mongoose");

const defaultImageUrl =
  "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

const createNewUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { name, email, password, tagline } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signup failed", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Could not signup, user already exists", 422);
    return next(error);
  }

  //hashing the password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not signup, please try again", 500);
    return res.status(500).json({
      message: error.message,
    });
  }

  let createdUser;
  try {
    createdUser = new User({
      name,
      email,
      password: hashedPassword,
      tagline,
      profilePicture: defaultImageUrl,
      posts: [],
    });

    await createdUser.save();
  } catch (err) {
    const error = new HttpError("User creation failed", 500);
    return res.status(500).json({
      message: error.message || "An unknown error occurred",
    });
  }

  // generating jwt token
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.SESSION_KEY,
      { expiresIn: "2h" }
    );
  } catch (err) {
    const error = new HttpError("Could not create user", 500);
    return res.status(422).json({
      message: error.message,
    });
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    profilePicture: createdUser.profilePicture,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email }); //finding the user with mail ID in db
  } catch (err) {
    const error = new HttpError("Login failed", 500);
    return res.status(500).json({
      message: error.message,
    });
  }

  if (!existingUser) {
    //if no user found give error
    const error = new HttpError("Invalid credentials", 401);
    return res.status(401).json({
      message: error.message,
    });
  }

  //checking password validity
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Unknown error occurred", 422);
    return res.status(422).json({
      message: error.message,
    });
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid credentials", 401);
    return res.status(401).json({
      message: error.message,
    });
  }

  //generating jwt token
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        profilePicture: existingUser.profilePicture,
      },
      process.env.SESSION_KEY,
      { expiresIn: "2h" }
    );
  } catch (err) {
    const error = new HttpError("Login failed", 500);
    return res.status(500).json({
      message: error.message,
    });
  }

  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    message: "Successfully logged in",
    token: token,
    profilePicture: existingUser.profilePicture,
  });
};

const getUserById = async (req, res, next) => {
  const userId = req.userData.userId;

  let user;
  try {
    user = await User.findById(userId).select("-password");
  } catch (err) {
    const error = new HttpError("User not found", 404);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("User not found", 404);
    return next(error);
  }
  res.status(200).json(user.toObject({ getters: true }));
  // if (req.user && req.user.id === userId) {
  //   const user = await User.findById(userId).select("-password");
  //   if (!user) {
  //     res.status(404).send("User not found");
  //   } else {
  //     res.json(user);
  //   }
  // } else {
  //   res.status(401).send("Unauthorized");
  // }
};

const updateUserById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  const userId = req.userData.userId;
  const { name, email, tagline } = req.body;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("User not found", 404);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("User not found", 404);
    return next(error);
  }

  //the user might not want to update all the fields so we used the OR operator.
  user.name = name || user.name;
  user.email = email || user.email;
  user.tagline = tagline || user.tagline;
  if (req.file) {
    if (user.profilePicture !== defaultImageUrl) {
      //if the user updates the profile picture, the last profile picture will be deleted and new will be added in the file system
      const profileImage = user.profilePicture.replace(
        "http://localhost:5000/",
        ""
      );

      fs.unlink(profileImage, (err) => {
        console.log(err);
      });
    }
    user.profilePicture = `http://localhost:5000/${req.file.path}`;
  } else {
    user.profilePicture = user.profilePicture;
  }

  let updatedUser;
  try {
    updatedUser = await user.save();
  } catch (err) {
    const error = new HttpError("Could not update the user details", 500);
    return next(error);
  }
  res.status(200).json(updatedUser.toObject({ getters: true }));
};

const deleteUser = async (req, res, next) => {
  const userId = req.userData.userId;
  let deletedUser;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    let user;
    user = await User.findById(userId).populate("posts");
    if (!user) {
      const error = new HttpError("Could not find this user", 500);
      return next(error);
    }

    if (user.profilePicture !== defaultImageUrl) {
      const profileImage = user.profilePicture.replace(
        "http://localhost:5000/",
        ""
      );

      fs.unlink(profileImage, (err) => {
        console.log(err);
      });
    }
    for (const postId of user.posts) {
      const post = await Post.findById(postId);
      if (!post) continue;

      const postImagePath = post.image;
      fs.unlink(postImagePath, (err) => {
        if (err) console.error(err);
      });

      await post.remove({ session: sess });
    }
    deletedUser = await user.remove({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    await sess.abortTransaction();
    const error = new HttpError("Could not delete the user", 500);
    return next(error);
  }

  res.status(200).json({
    message: "Deleted",
    deletedUser: deletedUser.toObject({ getters: true }),
  });
};

module.exports = {
  createNewUser,
  login,
  getUserById,
  updateUserById,
  deleteUser,
};
