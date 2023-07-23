const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./testHelper");
const Blog = require("../models/blogModel");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
});

test("Blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Blogs json should have a unique identifier", async () => {
  (await api.get("/api/blogs")).body.forEach((doc) => {
    expect(doc.id).toBeDefined();
  });
});

test("testing blog post method", async () => {
  const LenBeforeInsert = 10;

  const postData = {
    title: "sampledasdasd",
    author: "xd",
    url: "example",
    likes: "69",
  };

  await api.post("/api/blogs").send(postData).expect(201);

  const LenAfterInsert = (await api.get("/api/blogs")).body.length;

  expect(LenAfterInsert).toBe(LenBeforeInsert + 1);
});

test("when like prop is not supplied it will default to zero", async () => {
  const postData = {
    title: "sampledasdasd",
    author: "xd",
    url: "example",
  };

  const result = await api.post("/api/blogs").send(postData).expect(201);
  expect(result.body.likes).toBe(0);
});

test("Expect 400 when title or url missing in post data", async () => {
  const postData = {
    author: "xd",
    url: "example",
  };
  const _postData = {
    title: "sampledasdasd",
    author: "xd",
  };
  await api.post("/api/blogs").send(postData).expect(400);
  await api.post("/api/blogs").send(_postData).expect(400);
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length - 1);
  });

  test("404 if id not exist in db", async () => {
    const id = await testHelper.nonExistingId();
    await api.delete(`/api/blogs/${id}`).expect(404);
  });
});

describe("updation of a blog", () => {
  test("succeeds with status code 200 if id is valid", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.title = "this part is updated";
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);
  });

  test("404 if id not exist in db", async () => {
    const id = await testHelper.nonExistingId();
    const postData = {
      title: "sampledasdasd",
      author: "xd",
      url: "example",
    };
    await api.put(`/api/blogs/${id}`).send(postData).expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
