const HttpError = require("../models/http-error");
const User = require("../models/user");

const createNewUser = async (req, res, next) => {
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

  // const createdPost =

  res.status(201).json({
    user: createdUser,
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

  if (existingUser.password !== password) {
    //checking if the existing user password matches with the body password
    const error = new HttpError("Invalid credentials", 401);
    return res.status(401).json({
      message: error.message,
    });
  }

  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    message: "Successfully logged in",
  });
};

module.exports = {
  createNewUser,
  login,
};
