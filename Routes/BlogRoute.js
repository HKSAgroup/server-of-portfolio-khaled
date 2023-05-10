const express = require("express");
const { getBlogs, createBlog, getBlogById, deleteBlogController, updateBlogByIdController, blogCommentController, patchBlogCommentController, getBlogByPath, deleteBlogCommentController } = require("../Controllers/BlogController");
const router = express.Router();

router.route("/").get(getBlogs).post(createBlog);

router
  .route("/:id")
  .get(getBlogById)
  .delete(deleteBlogController)
  .patch(updateBlogByIdController)
  .put(blogCommentController)

router
  .route("/:path").get(getBlogByPath)

router
  .route("/comment/:id")
  .patch(patchBlogCommentController)
  .delete(deleteBlogCommentController)



module.exports = router;
