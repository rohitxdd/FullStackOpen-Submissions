const { SECRET } = require("../utils/config");
const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  if (request.method !== "GET") {
    logger.info("Body:  ", request.body);
  }
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error) {
    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
      return response.status(422).json({ error: error.message });
    } else if (error.name === "TokenExpiredError") {
      return response.status(401).json({
        error: "token expired",
      });
    } else {
      return response.status(422).json({ error: error.message });
    }
  }
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    req.token = token.replace("Bearer ", "");
    next();
  } else {
    res.status(401).json({ error: "Unauthorized - Token not provided" });
  }
};

const userExtractor = (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, SECRET);
  if (decodedToken) {
    req.userid = decodedToken.id;
    return next();
  }
  return res.status(401).json({ error: "invalid token" });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
