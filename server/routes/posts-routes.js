const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const postController = require("../controllers/posts");
const fileUpload = require("../middleware/file-upload");

router.get("/", postController.getPosts);
router.get("/:pid", postController.getPostsById);
router.get("/user/:uid", postController.getPostsByUserId); //in this a user will see their posts, this page is not ready in front end and this is only available fro authenticated users.

router.post(
  "/new",
  fileUpload.single("image"),
  [
    check("headline").not().isEmpty(),
    check("description").isLength({ min: 50 }),
    check("tag").not().isEmpty(),
  ],
  postController.createPosts
);

module.exports = router;
