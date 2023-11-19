require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
} = require("./utils/middleware");

let URI = process.env.MONGO_URI;
if (process.env.NODE_ENV === "test") {
  URI = process.env.MONGO_URI_TEST;
}
mongoose.connect(URI);
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/api/blogs", tokenExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
