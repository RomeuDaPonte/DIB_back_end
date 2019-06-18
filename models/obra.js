const Joi = require("joi");
const fs = require("fs");

function validatePath(path) {
  const schema = {
    nomeDoCliente: Joi.string().required(),
    numeroDoOrcamento: Joi.string().required(),
    descritivo: Joi.string().required()
  };

  return Joi.validate(path, schema); //devolve um objecto com varias propriedades,
}

function createPath(path) {
  const { nomeDoCliente, numeroDoOrcamento, descritivo } = path;
  const ano = new Date().getFullYear();
  const caminho = `../${ano}`;
  const caminhoComNomeDoCliente = `${caminho}/${nomeDoCliente}`;
  const pathComNMaisDescritivo = `${caminhoComNomeDoCliente}/${numeroDoOrcamento} - ${descritivo}`;

  if (!fs.existsSync(caminho)) fs.mkdirSync(caminho);

  if (!fs.existsSync(caminhoComNomeDoCliente))
    fs.mkdirSync(caminhoComNomeDoCliente);

  if (!fs.existsSync(pathComNMaisDescritivo)) {
    fs.mkdirSync(pathComNMaisDescritivo);
    fs.mkdirSync(`${pathComNMaisDescritivo}/CAD`);
    fs.mkdirSync(`${pathComNMaisDescritivo}/CAM`);
    fs.mkdirSync(`${pathComNMaisDescritivo}/Informações técnicas`);
    fs.mkdirSync(`${pathComNMaisDescritivo}/CAD/Artigo`);
    fs.mkdirSync(`${pathComNMaisDescritivo}/CAD/BUC`);
    fs.mkdirSync(`${pathComNMaisDescritivo}/CAD/CAV`);
    fs.mkdirSync(`${pathComNMaisDescritivo}/CAD/Equipamento`);
  }

  return true;
}

exports.validatePath = validatePath;
exports.createPath = createPath;
