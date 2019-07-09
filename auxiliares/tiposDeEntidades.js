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
  return [
    tiposDeEntidades.cliente,
    tiposDeEntidades.fornecedor,
    tiposDeEntidades.clienteFornecedor
  ];
}

exports.getAllTiposDeEntidades = allTiposDeEntidades;
