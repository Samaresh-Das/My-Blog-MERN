const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
router.post("/update", upload.single("image"), userController.updateUserById);

router.delete("/delete", userController.deleteUser);

module.exports = router;
