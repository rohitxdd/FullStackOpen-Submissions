const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./testHelper");
const User = require("../models/userModel");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

describe("User creation", () => {
  it("should create a new user with valid inputs", async () => {
    const newUser = {
      username: "john_doe",
      password: "pass123",
      name: "John Doe",
    };

    const response = await api.post("/api/users").send(newUser).expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.name).toBe(newUser.name);
  });

  it("should return 422 when username is less than or equal to 3 characters", async () => {
    const newUser = {
      username: "abc",
      password: "pass123",
      name: "Test User",
    };

    await api.post("/api/users").send(newUser).expect(422);
  });

  it("should return 422 when password is less than or equal to 3 characters", async () => {
    const newUser = {
      username: "test_user",
      password: "abc",
      name: "Test User",
    };

    await api.post("/api/users").send(newUser).expect(422);
  });

  it("should return 422 when username is not unique", async () => {
    const existingUser = {
      username: "existing_user",
      password: "pass123",
      name: "Existing User",
    };

    await api.post("/api/users").send(existingUser).expect(201);

    const duplicateUser = {
      username: "existing_user",
      password: "newpass123",
      name: "Duplicate User",
    };

    await api.post("/api/users").send(duplicateUser).expect(422);
  });
});
