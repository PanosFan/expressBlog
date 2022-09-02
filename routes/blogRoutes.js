const express = require("express");
const router = express.Router();
const blogRouter = require("../controllers/blogController");

router.get("/", blogRouter.blog_index);
router.get("/create", blogRouter.blog_create_get);
router.get("/:id", blogRouter.blog_details);
router.delete("/:id", blogRouter.blog_delete);
router.post("/", blogRouter.blog_create_post);

module.exports = router;
