require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");

const URI = process.env.MONGO_URI;
mongoose.connect(URI);
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/api/blogs", blogRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
