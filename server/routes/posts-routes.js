const express = require("express");
const router = express.Router();

const postController = require("../controllers/posts");

router.get("/", postController.getPosts);
router.get("/:pid", postController.getPostsById);
router.get("/user/:uid", postController.getPostsByUserId);

router.post("/new", postController.createPosts);

module.exports = router;
