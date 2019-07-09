const {
  User,
  validateUser,
  validateLogin,
  validateEditarUser
} = require("../models/user");
const authAdmin = require("../middleware/authAdmin");
const { getAllRoles } = require("../auxiliares/roleName");
const _ = require("lodash"); //video 127
const bcrypt = require("bcrypt"); //video 128
const express = require("express");
const router = express.Router();

router.post("/new", authAdmin, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email já registado.");

  user = new User(_.pick(req.body, ["name", "email", "password", "role"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email", "role"]));
});

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Password incorreta!");

  const token = user.generateAuthToken();
  res.send(token);
});

router.get("/roles", authAdmin, async (req, res) => {
  res.send(getAllRoles());
});

router.get("/users", authAdmin, async (req, res) => {
  res.send(
    await User.find()
      .select("name email role")
      .sort("name")
  );
});

router.get("/:id", authAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send("not found!");

  res.send(_.pick(user, ["_id", "name", "email", "role"]));
});

router.put("/:id", authAdmin, async (req, res) => {
  const { error } = validateEditarUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("not found!");

  if (req.body.role) user.role = req.body.role;
  else if (req.body.password) {
    delete user.password;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  await user.save();
  res.send(_.pick(user, ["_id", "name", "email", "role"]));
});

module.exports = router;
