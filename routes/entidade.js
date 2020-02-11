const express = require("express");
const router = express.Router();
const _ = require("lodash");
const {
  getAllTiposDeEntidades,
  tiposDeEntidades
} = require("../auxiliares/tiposDeEntidades");
const {
  getAllCondicoesDePagamento
} = require("../auxiliares/condicoesDePagamento");
const { Entidade, validateEntidade } = require("../models/entidade");

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

  res.send(
    _.pick(entidade, [
      "_id",
      "name",
      "nif",
      "morada",
      "codigoPostal",
      "localidade",
      "condicoesDePagamento",
      "tipo"
    ])
  );
});

router.get("/getAll", async (req, res) => {
  res.send(await Entidade.find().sort("name"));
});

router.get("/getAllClientes", async (req, res) => {
  const clientes = await Entidade.find()
    .or({ tipo: tiposDeEntidades.cliente })
    .or({ tipo: tiposDeEntidades.clienteFornecedor })
    .sort({ name: 1 })
    .select({
      name: 1,
      _id: 1,
      tipo: 1,
      nif: 1,
      morada: 1,
      codigoPostal: 1,
      localidade: 1,
      condicoesDePagamento: 1
    });

  res.send(clientes);
});

router.get("/getTipos", async (req, res) => {
  res.send(getAllTiposDeEntidades());
});

router.get("/condicoesdepagamento", async (req, res) => {
  res.send(getAllCondicoesDePagamento());
});

router.post("/search", async (req, res) => {
  const entidades = await Entidade.find().and([
    { name: new RegExp(`^${req.body.name}`, "i") },
    { nif: new RegExp(`^${req.body.nif}`, "i") },
    { localidade: new RegExp(`^${req.body.localidade}`, "i") },
    { morada: new RegExp(`^${req.body.morada}`, "i") },
    { codigoPostal: new RegExp(`^${req.body.codigoPostal}`, "i") }
  ]);

  res.send(entidades);
});

router.get("/:id", async (req, res) => {
  const entidade = await Entidade.findById(req.params.id);

  if (!entidade) return res.status(400).send("entidade não encontrada");

  res.send(entidade);
});

module.exports = router;
