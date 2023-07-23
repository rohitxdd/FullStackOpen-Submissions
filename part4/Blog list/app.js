require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");

let URI = process.env.MONGO_URI;
if (process.env.NODE_ENV === "test") {
  URI = process.env.MONGO_URI_TEST;
}
mongoose.connect(URI);
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/api/blogs", blogRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
