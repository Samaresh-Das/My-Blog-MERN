const HttpError = require("../models/http-error");
const User = require("../models/user");

const createNewUser = async (req, res, next) => {
  const { name, email, password, tagline, profilePicture } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signup failed", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Could not signup, user already exists", 422);
    return res.status(422).json({
      message: error.message,
    });
  }

  let createdUser;
  try {
    createdUser = new User({
      name,
      email,
      password,
      tagline,
      profilePicture,
      posts: [],
    });

    await createdUser.save();
  } catch (err) {
    const error = new HttpError("User creation failed", 500);
    return res.status(500).json({
      message: error.message || "An unknown error occurred",
    });
  }

  // const createdPost =

  res.status(201).json({
    post: createdUser,
  });
};

module.exports = {
  createNewUser,
};
