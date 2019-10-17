const tipo = {
  cliente: "Cliente",
  fornecedor: "Fornecedor",
  clienteFornecedor: "Cliente/Fornecedor"
};

exports.tiposDeEntidades = {
  cliente: tipo.cliente,
  fornecedor: tipo.fornecedor,
  clienteFornecedor: tipo.clienteFornecedor
};

function allTiposDeEntidades() {
  return [tipo.cliente, tipo.fornecedor, tipo.clienteFornecedor];
}

exports.getAllTiposDeEntidades = allTiposDeEntidades;
exports.tipoDeEntidade = tipo;
