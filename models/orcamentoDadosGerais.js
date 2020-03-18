const mongose = require("mongoose");
const Joi = require("joi");
const { condicoesDePagamento } = require("../auxiliares/condicoesDePagamento");

const orcamentoSchema = new mongose.Schema({
  cliente: {
    type: mongose.Schema.Types.ObjectId,
    ref: "Entidade",
    required: true
  },
  elaboradoPor: {
    type: mongose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  descritivo: {
    type: String,
    required: true
  },
  tecnicoResponsavel: {
    type: String,
    required: true
  },
  diasNecessariosParaRealizarObra: {
    type: Number
  },
  revisao: {
    type: Number,
    min: 0
  },
  numero: {
    type: String,
    unique: true
  },
  data: {
    type: Date,
    default: Date.now 
  },
  terminado: {
    type: Boolean
  },
  condicoesDePagamento: {
    type: String
  },
  margem: {
    type: Number
  },
  totalFinal: {
    type: Number
  }
});

const Orcamento = mongose.model("Orcamento", orcamentoSchema);

function getNumeroDoOrcamento(numeroDeOrcamentoDesteAno) {
  const ano = new Date()
    .getFullYear()
    .toString()
    .substr(2, 2);

  if (numeroDeOrcamentoDesteAno < 10)
    return `${ano}-000${numeroDeOrcamentoDesteAno}`;
  else if (numeroDeOrcamentoDesteAno < 100)
    return `${ano}-00${numeroDeOrcamentoDesteAno}`;
  else if (numeroDeOrcamentoDesteAno < 1000)
    return `${ano}-0${numeroDeOrcamentoDesteAno}`;
  else `${ano}-${numeroDeOrcamentoDesteAno}`;
}

function validateNovoOrcamento(req) {
  const schema = {
    clienteId: Joi.string().required(),
    elaboradoPorId: Joi.string().required(),
    descritivo: Joi.string().required(),
    tecnicoResponsavel: Joi.string().required()
  };

  return Joi.validate(req, schema);
}

function validateEditarOrcamento(req) {
  const schema = {
    orcamentoId: Joi.any(),
    clienteId: Joi.string().required(),
    elaboradoPorId: Joi.string().required(),
    descritivo: Joi.string().required(),
    tecnicoResponsavel: Joi.string().required(),
    condicoesDePagamento: Joi.string()
      .valid(
        condicoesDePagamento.prontoPagamento,
        condicoesDePagamento.trintaDias,
        condicoesDePagamento.sessentaDias,
        condicoesDePagamento.noventaDias,
        condicoesDePagamento.quarentaMaisSessenta
      )
      .required(),
    diasNecessariosParaRealizarObra: Joi.number().required(),
    margem: Joi.number().required(),
    totalFinal: Joi.number().required()
  };

  return Joi.validate(req, schema);
}

exports.Orcamento = Orcamento;
exports.validateNovoOrcamento = validateNovoOrcamento;
exports.getNumeroDoOrcamento = getNumeroDoOrcamento;
exports.validateEditarOrcamento = validateEditarOrcamento;
