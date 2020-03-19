const express = require("express");
const router = express.Router();
const { Orcamento } = require("../models/orcamentoDadosGerais");
const {
  Tarefa,
  validateNovaTarefa,
  totalEValido
} = require("../models/tarefa");

router.post("/:orcamentoId", async (req, res) => {
  const orc = await Orcamento.findById(req.params.orcamentoId);
  if (!orc)
    return res.status(400).send("Orçamento não existe na base de dados!");

  const { error } = validateNovaTarefa(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!totalEValido(req.body)) return res.status(400).send("Total invalido!");

  let tarefa = new Tarefa({
    orcamentoId: req.params.orcamentoId,
    ...req.body
  });

  await tarefa.save();

  res.send(await Tarefa.findById(tarefa._id).select({ __v: 0 }));
});

router.get("/getallfororcamento/:orcamentoId", async (req, res) => {
  console.log(req.params.orcamentoId);
  const orc = await Orcamento.findById(req.params.orcamentoId);

  if (!orc)
    return res.status(400).send("Orçamento não existe na base de dados!");

  res.send(
    await Tarefa.find({ orcamentoId: req.params.orcamentoId }).select({
      __v: 0
    })
  );
});

module.exports = router;
