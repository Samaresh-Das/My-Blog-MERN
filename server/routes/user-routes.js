const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");
const userController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

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

router.use(checkAuth);

router.get("/profile/user", userController.getUserById);
router.post(
  "/update",
  fileUpload.single("image"),
  userController.updateUserById
);

router.delete("/delete", userController.deleteUser);

module.exports = router;
