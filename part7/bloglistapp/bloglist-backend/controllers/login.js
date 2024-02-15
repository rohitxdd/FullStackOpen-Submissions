const { SECRET } = require("../utils/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const User = require("../models/userModel");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username and password." });
  }

  const tokenPayload = {
    username,
    id: user.id,
  };

  const token = jwt.sign(tokenPayload, SECRET, { expiresIn: 60 * 60 });
  res.status(200).send({ token, username, name: user.name });
});

module.exports = loginRouter;
