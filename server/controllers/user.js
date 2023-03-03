const HttpError = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

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
      profilePicture:
        "https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg",
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
      "volodimir",
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
      "volodimir",
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

module.exports = {
  createNewUser,
  login,
};
