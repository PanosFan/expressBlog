const express = require("express");
const morgan = require("morgan");

// express app
const app = express();

// listening on port 3000
app.listen(3000);

// register view engine (ejs)
app.set("view engine", "ejs"); //default folder: views
// app.set('views', 'myViews') an thelo na einai allo to folder ton views

// custom made middleware
app.use((req, res, next) => {
  console.log("new request");
  next(); //an den balo next(), den proxoraei
});

// middleware gia reporting
app.use(morgan("dev"));

// static files (css klp)
app.use(express.static("public")); //arguement einai to onoma tou fakelou pou thelo na doso access ston browser

// routing
app.get("/", (req, res) => {
  // res.send("<p>test</p>");
  // res.sendFile("./views/index", { root: __dirname }); thelei to object giati to proto argument prepei na einai abs path
  //to parapano einai gia xrisi html, oxi template engine
  res.render("index", { title: "home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" }); //gia xrisi me ejs (about.ejs mesa sto views folder) || this 2i param, pernao value sto view
});

// redirect
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// app.use trexei panta, opote gia middleware. Ara sto telos gia to 404 giati tha stamatisei ekei to res
app.use(
  (req, res) => res.status(404).render("error", { title: 404 })
  // res.sendStatus(404) an thelo na steilo diko mou status, xoris chaining
);
