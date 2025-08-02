const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const postController = require("../controllers/posts");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", postController.getPosts);
router.get("/:pid", postController.getPostsById);
router.get("/user/:uid", postController.getPostsByUserId); //in this a user will see their posts, this page is not ready in front end and this is only available for authenticated users.

router.use(checkAuth);
router.post(
  "/new",
  upload.single("image"),
  [
    check("headline").not().isEmpty(),
    check("description").isLength({ min: 20 }),
    check("category").not().isEmpty(),
  ],
  postController.createPosts
);

router.patch(
  "/update/:pid",
  [
    check("headline").not().isEmpty(),
    check("description").isLength({ min: 50 }),
    check("tag").not().isEmpty(),
  ],
  postController.updatePostById
);

router.delete("/del/:pid", postController.deletePost);

module.exports = router;
