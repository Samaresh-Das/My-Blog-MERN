const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const postController = require("../controllers/posts");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");
const { updatePostLimiter, createPostLimiter, getLimiter } = require("../limiters/postLimiter");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", getLimiter, postController.getPosts);
router.get("/:pid", getLimiter, postController.getPostsById);
router.get("/user/:uid", getLimiter, postController.getPostsByUserId);

router.use(checkAuth);
router.post(
  "/new",
  upload.single("image"),
  createPostLimiter,
  [
    check("headline").not().isEmpty(),
    check("description").isLength({ min: 20 }),
    check("category").not().isEmpty(),
  ],
  postController.createPosts
);

router.patch(
  "/update/:pid",
  updatePostLimiter,
  [
    check("headline").not().isEmpty(),
    check("description").isLength({ min: 50 }),
    check("tag").not().isEmpty(),
  ],
  postController.updatePostById
);

router.delete("/del/:pid", postController.deletePost);

module.exports = router;
