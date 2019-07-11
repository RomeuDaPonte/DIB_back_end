const condicoes = {
  prontoPagamento: "Pronto pagamento",
  trintaDias: "30 dias",
  sessentaDias: "60 dias",
  noventaDias: "90 dias",
  quarentaMaisSessenta: "40% + 60%"
};

exports.condicoesDePagamento = {
  prontoPagamento: condicoes.prontoPagamento,
  trintaDias: condicoes.trintaDias,
  sessentaDias: condicoes.sessentaDias,
  noventaDias: condicoes.noventaDias,
  quarentaMaisSessenta: condicoes.quarentaMaisSessenta
};

function allCondicoesDePagamento() {
  return [
    condicoes.prontoPagamento,
    condicoes.trintaDias,
    condicoes.sessentaDias,
    condicoes.noventaDias,
    condicoes.quarentaMaisSessenta
  ];
}

exports.getAllCondicoesDePagamento = allCondicoesDePagamento;
