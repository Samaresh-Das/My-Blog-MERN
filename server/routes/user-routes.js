const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../controllers/user");

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

module.exports = router;
