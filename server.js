const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
require("dotenv/config"); //to be able to use process.env.kati gia na krupso to link tis basis mesa sto .env arxeio

// express app
const app = express();

// connect to mongodb and then listening on port 3000
mongoose
  .connect(process.env.DB_CONN)
  .then(() => {
    console.log("connected to db");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs"); //default folder: views
// app.set('views', 'myViews') an thelo na einai allo to folder ton views

// custom made middleware
app.use((req, res, next) => {
  console.log("new request");
  next(); //an den balo next(), den proxoraei kai kollaei o browser se endless loading
});

// middleware oste na pernei ta values apo create.ejs oste na mporo na ta soso sti basi
app.use(express.urlencoded({ extended: true })); // form data
app.use(express.json()); // json parse apo to fetch body

// middleware gia reporting
app.use(morgan("dev"));

// static files (css klp)
app.use(express.static("public")); //arguement einai to onoma tou fakelou pou thelo na doso access ston browser

// routing
app.get("/", (req, res) => {
  // res.send("<p>test</p>");
  // res.sendFile("./views/index", { root: __dirname }); thelei to object giati to proto argument prepei na einai abs path
  //to parapano einai gia xrisi html, oxi template engine
  res.redirect("/blogs"); //redirect se allo link
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" }); //gia xrisi me ejs (about.ejs mesa sto views folder) || this 2i param, pernao value sto view
});

// blog routes
app.use("/blogs", blogRoutes);

// app.use trexei panta, opote gia middleware. Ara sto telos gia to 404 giati tha stamatisei ekei to res
app.use(
  (req, res) => res.status(404).render("error", { title: 404 })
  // res.sendStatus(404) an thelo na steilo diko mou status, xoris chaining
);

// allos tropos na kano save sti basi
// app.post("/blog/create", (req, res) => {
// const blog = new Blog({
//   title: "new blog",
//   snippet: "snippet",
//   body: "body of my new blog",
// });
// blog
//   .save()
//   .then((result) => res.send(result))
//   .catch((err) => console.log(err));
// opos akribos laravel models, mporo eite new Blog, eite na to kano amesos
//   Blog.create({
//     title: "new test",
//     snippet: "snip",
//     body: "body",
//   }).then((result) => res.send(result));
// });
