const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("blogs/index", { title: "home", blogs: result })
    )
    .catch((err) => console.log(err));
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create" });
};

const blog_create_post = (req, res) => {
  Blog.create(req.body)
    .then(() => res.redirect("/blogs"))
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) =>
      res.render("blogs/details", { title: result.title, blog: result })
    )
    .catch(() => res.status(404).render("error", { title: "Blog not found" }));
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
};

const blog_put = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  Blog.findByIdAndUpdate(id, req.body)
    .then(res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete,
  blog_put,
};
