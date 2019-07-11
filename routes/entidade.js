const { getAllTiposDeEntidades } = require("../auxiliares/tiposDeEntidades");
const {
  getAllCondicoesDePagamento
} = require("../auxiliares/condicoesDePagamento");
const { Entidade, validateEntidade } = require("../models/entidade");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateEntidade(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let novoEntidade = await Entidade.findOne({ name: req.body.name });
  if (novoEntidade)
    return res.status(400).send("Nome de entidade já registado");

  novoEntidade = new Entidade(req.body);
  await novoEntidade.save();

  res.send(novoEntidade);
});

router.put("/:id", async (req, res) => {
  const { error } = validateEntidade(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const entidade = await Entidade.findById(req.params.id);
  if (!entidade) return res.status(400).send("Entidade não existe na bd");

  entidade.set({
    name: req.body.name,
    nif: req.body.nif,
    morada: req.body.morada,
    codigoPostal: req.body.codigoPostal,
    localidade: req.body.localidade,
    condicoesDePagamento: req.body.condicoesDePagamento,
    tipo: req.body.tipo
  });

  await entidade.save();

  res.send(entidade);
});

router.get("/getAll", async (req, res) => {
  res.send(await Entidade.find().sort("name"));
});

router.get("/getTipos", async (req, res) => {
  res.send(getAllTiposDeEntidades());
});

router.get("/condicoesdepagamento", async (req, res) => {
  res.send(getAllCondicoesDePagamento());
});

module.exports = router;
