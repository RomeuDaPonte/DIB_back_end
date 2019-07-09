const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const { getAllTiposDeEntidades } = require("../auxiliares/tiposDeEntidades");
const {
  getAllCondicoesDePagamento
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
  codicoesDePagamento: {
    type: String,
    enum: getAllCondicoesDePagamento()
  },
  tipo: {
    type: String,
    enum: getAllTiposDeEntidades()
  }
});

const Entidade = mongoose.model("Entidade", entidadeSchema);

exports.Entidade = Entidade;
