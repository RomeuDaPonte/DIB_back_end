const mongoose = require("mongoose");
const Joi = require("joi");
const {
  getAllTiposDeEntidades,
  tiposDeEntidades
} = require("../auxiliares/tiposDeEntidades");
const {
  getAllCondicoesDePagamento,
  condicoesDePagamento
} = require("../auxiliares/condicoesDePagamento");

const entidadeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nif: {
    type: String
  },
  morada: {
    type: String
  },
  codigoPostal: {
    type: String
  },
  localidade: {
    type: String
  },
  condicoesDePagamento: {
    type: String,
    required: true,
    enum: getAllCondicoesDePagamento()
  },
  tipo: {
    type: String,
    required: true,
    enum: getAllTiposDeEntidades()
  }
});

const Entidade = mongoose.model("Entidade", entidadeSchema);

function validate(req) {
  const schema = {
    name: Joi.string().required(),
    nif: Joi.any(),
    morada: Joi.any(),
    codigoPostal: Joi.any(),
    localidade: Joi.any(),
    condicoesDePagamento: Joi.string()
      .valid(
        condicoesDePagamento.prontoPagamento,
        condicoesDePagamento.trintaDias,
        condicoesDePagamento.sessentaDias,
        condicoesDePagamento.noventaDias,
        condicoesDePagamento.quarentaMaisSessenta
      )
      .required(),
    tipo: Joi.string()
      .valid(
        tiposDeEntidades.cliente,
        tiposDeEntidades.fornecedor,
        tiposDeEntidades.clienteFornecedor
      )
      .required()
  };

  return Joi.validate(req, schema);
}

exports.Entidade = Entidade;
exports.validateEntidade = validate;
