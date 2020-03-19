const express = require("express");
const router = express.Router();
const _ = require("lodash"); //video 127
const pdfMake = require("../pdfmake/pdfmake");
const vfsFonts = require("../pdfmake/vfs_fonts");
pdfMake.vfs = vfsFonts.pdfMake.vfs;
const {
  Orcamento,
  validateNovoOrcamento,
  getNumeroDoOrcamento,
  validateEditarOrcamento
} = require("../models/orcamentoDadosGerais");
const { Entidade } = require("../models/entidade");
const { User } = require("../models/user");
const { generatePdf } = require("../models/orcamento");
const { tipoDeEntidade } = require("../auxiliares/tiposDeEntidades");

router.post("/", async (req, res) => {
  const orcamentosRealizadosEsteAno = await Orcamento.find({
    data: { $gte: new Date(`${new Date().getFullYear()}`) }
  }).countDocuments();

  const { error } = validateNovoOrcamento(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const entidade = await Entidade.findById(req.body.clienteId);
  if (!entidade) return res.status(400).send("Cliente não existe!");

  if (entidade.tipo === tipoDeEntidade.fornecedor)
    return res.send("Entidade registada como fornecedor!");

  const userCriadorDoOrcamento = await User.findById(req.body.elaboradoPorId);
  if (!userCriadorDoOrcamento)
    return res.status(400).send("Erro interno relacionado com user!");

  let orcamento = new Orcamento({
    cliente: req.body.clienteId,
    descritivo: req.body.descritivo,
    tecnicoResponsavel: req.body.tecnicoResponsavel,
    elaboradoPor: req.body.elaboradoPorId,
    numero: getNumeroDoOrcamento(orcamentosRealizadosEsteAno)
  });
  orcamento = await orcamento.save();

  res.send(
    await Orcamento.findById(orcamento._id)
      .populate("cliente")
      .populate("elaboradoPor")
  );
});

router.put("/:id", async (req, res) => {
  const orcamento = await Orcamento.findById(req.params.id);
  if (!orcamento)
    return res.status(400).send("Orçamento não existe na base de dados!");

  const { error } = validateEditarOrcamento(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const entidade = await Entidade.findById(req.body.clienteId);
  if (!entidade) return res.status(400).send("Cliente não existe!");

  if (entidade.tipo === tipoDeEntidade.fornecedor)
    return res.send("Entidade registada como fornecedor!");

  const userCriadorDoOrcamento = await User.findById(req.body.elaboradoPorId);
  if (!userCriadorDoOrcamento)
    return res.status(400).send("Erro interno relacionado com user!");

  orcamento.set({
    ...req.body
  });

  await orcamento.save();

  res.send(
    await Orcamento.findById(orcamento._id)
      .populate("cliente")
      .populate("elaboradoPor")
  );
});

router.get("/getall", async (req, res) => {
  res.send(
    await Orcamento.find()
      .populate("cliente")
      .populate("elaboradoPor")
      .sort({ data: -1 })
      .select({ __v: 0 })
  );
});

router.get("/:id", async (req, res) => {
  const orc = await Orcamento.findById(req.params.id)
    .populate("cliente")
    .populate("elaboradoPor");

  if (!orc) return res.status(400).send("Orcamento não existe!");

  res.send(orc);
});

router.post("/downloadpdf", (req, res) => {
  let documentDefinition = generatePdf(req.body);

  const pdfDoc = pdfMake.createPdf(documentDefinition);
  pdfDoc.getBase64(data => {
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment;filename="filename.pdf"'
    });

    res.end(data);
  });
});

module.exports = router;
