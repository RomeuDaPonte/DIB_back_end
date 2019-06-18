const { User, validateUser, validateLogin } = require("../models/user");
const auth = require("../middleware/auth");
const { roleName } = require("../auxiliares/roleName");
const _ = require("lodash"); //video 127
const bcrypt = require("bcrypt"); //video 128
const express = require("express");
const router = express.Router();

router.post("/new", auth, async (req, res) => {
  if (req.user.role !== roleName.admin)
    return res.status(401).send("Não tem permissão para criar um novo user.");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email já registado.");

  user = new User(_.pick(req.body, ["name", "email", "password", "role"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["name", "email", "role"]));
});

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
