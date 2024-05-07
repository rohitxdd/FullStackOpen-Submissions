const userRouter = require("express").Router();
var bcrypt = require("bcryptjs");
const User = require("../models/userModel");

userRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;
  if (password && password.length <= 3) {
    return response
      .status(422)
      .json({
        error: "username and password must be greater than 3 characters",
      });
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
  const result = await User.find({})
  if (result) {
    const transformedResult = result.map(elem => {
      const obj = elem.toJSON()
      return ({ ...obj, blogs: obj.blogs.length })
    })
    return response.status(200).json(transformedResult)
  } else {
    return response.json([])
  }
});

module.exports = userRouter;
