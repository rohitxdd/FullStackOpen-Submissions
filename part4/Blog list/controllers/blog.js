const { SECRET } = require("../utils/config");
const blogRouter = require("express").Router();
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const res = await Blog.find({}).populate("user");
  response.json(res);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const token = request.token;
  const decodedToken = jwt.verify(token, SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  if (user) {
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: user.id,
    });

    const result = await newBlog.save();
    if (result) {
      user.blogs.push(result.id);
      await user.save();
    }
    return response.status(201).json(result);
  } else {
    return response.status(422).json({ msg: "no user found" });
  }
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ message: "not found" })
  }
  if (blog.user.toString() === request.userid) {
    const res = await Blog.findByIdAndRemove(request.params.id);
    if (res) {
      return response.status(204).end();
    }
    return response.status(404).end();
  }
  return response.status(403).json({ error: "unauthorized access" });
});

blogRouter.put("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    if (blog.user.toString() === request.userid) {
      const res = await Blog.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
      });
      if (res) {
        return response.status(200).end();
      }
    } else {
      return response.status(403).json({ error: "unauthorized access" });
    }
  }
  response.status(404).end();
});

module.exports = blogRouter;
