const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.blog_index);
router.get("/create", blogController.blog_create_get);
router.get("/:id", blogController.blog_details); //an auto mpei pano apo to create, sto /create tha trexei auto to route
router.post("/", blogController.blog_create_post);
router.delete("/:id", blogController.blog_delete);
router.put("/:id", blogController.blog_put);

module.exports = router;
