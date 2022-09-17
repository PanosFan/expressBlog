const express = require("express");
const router = express.Router();
const blogRouter = require("../controllers/blogController");

router.get("/", blogRouter.blog_index);
router.get("/create", blogRouter.blog_create_get);
router.get("/:id", blogRouter.blog_details); //an auto mpei pano apo to create, sto /create tha trexei auto to route
router.post("/", blogRouter.blog_create_post);
router.delete("/:id", blogRouter.blog_delete);
router.put("/:id", blogRouter.blog_put);

module.exports = router;
