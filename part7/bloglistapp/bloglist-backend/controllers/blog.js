const { SECRET } = require("../utils/config");
const blogRouter = require("express").Router();
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, SECRET);
  if (decodedToken.id) {
    const res = await Blog.find({}).populate("user");
    return response.json(res);
  }
  return response.status(403).json({ error: "unauthorized" });
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
    await result.populate("user");
    return response.status(201).json(result);
  } else {
    return response.status(422).json({ msg: "no user found" });
  }
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ message: "not found" });
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
      const res = await Blog.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
        },
      );
      if (res) {
        return response.status(200).end();
      }
    } else {
      return response.status(403).json({ error: "unauthorized access" });
    }
  }
  response.status(404).end();
});

blogRouter.put("/like/:id", async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }
  const blog = await Blog.findById(req.params.id).populate("user");
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  blog.likes += 1;
  await blog.save();
  return res.status(201).json(blog);
});

module.exports = blogRouter;
