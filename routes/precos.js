const express = require("express");
const router = express.Router();
const _ = require("lodash"); //video 127
const authAdmin = require("../middleware/authAdmin");
const { Precos, validatePrecos } = require("../models/precos");

router.post("/", authAdmin, async (req, res) => {
  const { body: novosPrecos } = req;

  const { error } = validatePrecos(novosPrecos);
  if (error) return res.status(400).send(error.details[0].message);

  let precos = await Precos.findOne();

  precos.set({
    automacao: novosPrecos.automacao,
    consultoria: novosPrecos.consultoria,
    desenvolvimento: novosPrecos.desenvolvimento,
    margem: novosPrecos.margem,
    maquinacao: novosPrecos.maquinacao,
    montagem: novosPrecos.montagem
  });

  const result = await precos.save();
  res.send(result);
});

router.get("/", async (req, res) => {
  var precos = await Precos.findOne();

  res.send(
    _.pick(precos, [
      "automacao",
      "consultoria",
      "desenvolvimento",
      "margem",
      "maquinacao",
      "montagem"
    ])
  );
});

module.exports = router;
