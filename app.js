const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//APP Config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE/MODEL/Config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTful Routes
// Blog.create({
//   title: "Test Blog",
//   image:
//     "https://cdn.cnn.com/cnnnext/dam/assets/170407220916-04-iconic-mountains-matterhorn-restricted.jpg",
//   body: "Hello this is a Blog Post"
// });

app.get("/", function(req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

//new route
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

//create route
app.post("/blogs", function(req, res) {
  //create blog then redirect to index
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("blogs");
    }
  });
});

//show route
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

app.listen(port, () => {
  console.log("listening on port", port);
});
