const express = require("express");
const { Mongoose } = require("mongoose");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const categoryModel = require("../models/category.model")
const hash = require("../hash");
const jwt = require("jsonwebtoken");
const { cleanUser } = require("../helpers/user.helper");
require("dotenv").config();
const multer = require('multer')
const {
  ensureAuthenticated,
} = require("../middlewares/authentication.middleware");

const routes = express.Router();

//Get all posts
routes.get("/posts", async (req, res, next) => {
  try {
    const posts = await postModel.find();
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Get post
routes.get("/posts/:id", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await postModel.find({ username });
    } else if (catName) {
      posts = await postModel.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await postModel.find();
    }
    const post = await postModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update post
routes.put("/posts/:id", ensureAuthenticated, async (req, res) => {
  try {
    if (!(req.body && req.body.title && req.body.body)) {
      return res.status(500).send("Incomplete input");
    }
    const id = req.params.id;
    const post = await postModel.findByIdAndUpdate(id, req.body, { new: true });
    console.log(id)
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Get all users
routes.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Register
routes.post("/register", async (req, res) => {
  try {
    if (!(req.body && req.body.username && req.body.email && req.body.password)) {
      return res
        .status(500)
        .send("Need all the inputs to complete registration");
    }
    let user = await userModel.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists");
    req.body.password = hash({ value: req.body.password }).fullHash;
    user = await userModel.create(req.body);
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Login
routes.post("/login", async (req, res) => {
  try {
    if (!(req.body && req.body.email && req.body.password)) {
      return res.status(500).send("Incomplete input");
    }
    const user = await userModel.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .send({ msg: "User is not registered!", ok: false });

    const [key, value] = user.password.split("$");

    const hashedPassword = hash({ key, value: req.body.password }).hashedValue;

    if (hashedPassword !== value)
      return res
        .status(400)
        .send({ msg: "Wrong email or password", ok: false });
    const token = jwt.sign(cleanUser(user), process.env.JWTSECRET);

    res.send({ token, user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Make a blog post
routes.post("/", ensureAuthenticated, async (req, res) => {
  try {
    if (!(req.body && req.body.title && req.body.desc)) {
      return res.status(500).send("Incomplete input");
    }

    const post = await postModel.create({
      title: req.body.title,
      desc: req.body.desc,
      author: req.body.author,
    });
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Delete Post
routes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModel.findByIdAndDelete(id);
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Create a new category
routes.post("/categories", async (req, res)=>{
  const newCat = new Category(req.body);
  try{
    const savedCat = await newCat.save()
    res.status(200).json(savedCat)
  }catch(err){
    res.status(500).json(err)
  }
})

//Get categories
routes.get("/categories", async(req, res)=>{
  try {
    const categories = await categoryModel.find();
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
  
})
const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
      cb(null, "images")
  },filename:(req,file,cb)=>{
      cb(null,"hello.jpg")
  }
});

const upload = multer({storage:storage})
routes.post("/upload", upload.single("file", (req,res)=>{
    res.status(200).json("File has been uploaded")
}))

module.exports = routes;
