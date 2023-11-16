const blogRouter = require("express").Router();
const Blog = require("../models/blogModel");
const user = require("../models/userModel");

blogRouter.get("/", async (request, response) => {
  const res = await Blog.find({}).populate("user");
  response.json(res);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const users = await user.find({});
  if (users) {
    const id = users[0].id;
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: id,
    });

    const result = await newBlog.save();
    if(result){
      users[0].blogs.push(result.id)
      await users[0].save()
    }
    return response.status(201).json(result);
  } else {
    return response.status(422).json({ msg: "no user found" });
  }
});

blogRouter.delete("/:id", async (request, response) => {
  const res = await Blog.findByIdAndRemove(request.params.id);
  if (res) {
    return response.status(204).end();
  }
  response.status(404).end();
});

blogRouter.put("/:id", async (request, response) => {
  const res = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  if (res) {
    return response.status(200).end();
  }
  response.status(404).end();
});

module.exports = blogRouter;
