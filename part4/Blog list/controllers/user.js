const userRouter = require("express").Router();
var bcrypt = require("bcryptjs");
const User = require("../models/userModel");

userRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;
  if (password && password.length <= 3) {
    return response
      .status(422)
      .json({error : "username and password must be greater than 3 characters"});
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = new User({
    username,
    name,
    password: passwordHash,
  });
  const result = await user.save();
  return response.status(201).json(result);
});

userRouter.get("/", async (request, response) => {
  const res = await User.find({}).populate('blogs').exec();
  response.json(res);
});

module.exports = userRouter;
