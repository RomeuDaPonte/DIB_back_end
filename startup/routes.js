const express = require("express");
const obras = require("../routes/obras");
const orcamentoDadosGerais = require("../routes/orcamentoDadosGerais");
const account = require("../routes/account");
const precos = require("../routes/precos");
const entidade = require("../routes/entidade");
const tarefa = require("../routes/tarefa");
const authentication = require("../middleware/auth");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/account", account);
  app.use(authentication);
  app.use("/api/obras", obras);
  app.use("/api/orcamentodadosgerais", orcamentoDadosGerais);
  app.use("/api/precos", precos);
  app.use("/api/entidade", entidade);
  app.use("/api/tarefa", tarefa);
};
