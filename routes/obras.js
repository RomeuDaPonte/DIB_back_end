const { validatePath, createPath } = require("../models/obra");
const express = require("express");
const router = express.Router();

router.post("/createPath", (req, res) => {
  const { error } = validatePath(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!createPath(req.body))
    return res.status(500).send("Erro ao criar caminho");

  res.send(true);
});

module.exports = router;
