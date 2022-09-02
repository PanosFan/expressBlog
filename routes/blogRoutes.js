const Blog = require("../models/blog");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render("index", { title: "home", blogs: result }))
    .catch((err) => console.log(err));
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Create" });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) =>
    res.render("details", { title: result.title, blog: result })
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  console.log(req.body);
  Blog.create(req.body)
    .then(() => res.redirect("/blogs"))
    .catch((err) => console.log(err));
});

module.exports = router;
