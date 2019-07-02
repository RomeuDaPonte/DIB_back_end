const mongoose = require("mongoose");
const Joi = require("joi");

const precosSchema = new mongoose.Schema({
  automacao: {
    type: Number,
    required: true
  },
  consultoria: {
    type: Number,
    required: true
  },
  desenvolvimento: {
    type: Number,
    required: true
  },
  margem: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  maquinacao: {
    type: Number,
    required: true
  },
  montagem: {
    type: Number,
    required: true
  }
});

const Precos = mongoose.model("Precos", precosSchema);

function validate(precos) {
  const schema = {
    automacao: Joi.number().required(),
    consultoria: Joi.number().required(),
    desenvolvimento: Joi.number().required(),
    margem: Joi.number()
      .required()
      .min(1)
      .max(100),
    maquinacao: Joi.number().required(),
    montagem: Joi.number().required()
  };

  return Joi.validate(precos, schema);
}

async function createDefaultPrecos() {
  let precos = await Precos.findOne();
  if (precos) {
    console.log("Precos ja definidos");
    return;
  }

  precos = new Precos({
    automacao: 10,
    consultoria: 10,
    desenvolvimento: 10,
    margem: 35,
    maquinacao: 10,
    montagem: 10
  });

  await precos.save();

  console.log("Precos iniciais definidos com sucesso!");
}

exports.Precos = Precos;
exports.validatePrecos = validate;
exports.createDefaultPrecos = createDefaultPrecos;
