const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  create: { type: Date, default: Date.now }
});

//MONGOOSE/MODEL/Config
var Blog = mongoose.model("Blog", blogSchema);

//RESTful Routes

app.listen(port, () => {
  console.log("listening on port", port);
});
