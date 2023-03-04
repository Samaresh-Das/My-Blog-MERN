const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");
const userController = require("../controllers/user");

router.get("/profile/:uid", userController.getUserById);

router.post(
  "/new",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
    check("tagline").not().isEmpty(),
  ],
  userController.createNewUser
);
router.post("/login", userController.login);

router.post(
  "/update/:uid",
  fileUpload.single("image"),
  userController.updateUserById
);

module.exports = router;
