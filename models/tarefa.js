const mongose = require("mongoose");
const Joi = require("joi");

const tarefaSchema = new mongose.Schema({
  orcamentoId: {
    type: mongose.Schema.Types.ObjectId,
    ref: "Orcamento",
    required: true
  },
  tipoDeTarefa: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  custoUnitario: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const Tarefa = mongose.model("Tarefa", tarefaSchema);

function validateNovaTarefa(req) {
  const schema = {
    orcamentoId: Joi.string().required(),
    descricao: Joi.string().required(),
    quantidade: Joi.number().required(),
    custoUnitario: Joi.number().required(),
    total: Joi.number().required()
  };

  return Joi.validate(req, schema);
}

function totalEValido(req) {
  const total = Math.round(req.total);
  const totalRecebido = Math.round(req.custoUnitario * req.quantidade);

  return total === totalRecebido;
}

exports.Tarefa = Tarefa;
exports.validateNovaTarefa = validateNovaTarefa;
exports.totalEValido = totalEValido;
