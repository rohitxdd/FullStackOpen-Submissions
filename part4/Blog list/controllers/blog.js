const blogRouter = require("express").Router();
const Blog = require("../models/blogModel");

blogRouter.get("/", async (request, response) => {
  const res = await Blog.find({});
  response.json(res);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const res = await Blog.findByIdAndRemove(request.params.id);
  if (res) {
    return response.status(204).end();
  }
  response.status(404).end();
});

blogRouter.put("/:id", async (request, response) => {
  const res = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
  if (res) {
    return response.status(200).end();
  }
  response.status(404).end();
});

module.exports = blogRouter;
