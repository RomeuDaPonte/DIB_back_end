const express = require("express");
const obras = require("../routes/obras");
const orcamento = require("../routes/orcamento");
const account = require("../routes/account");
const authentication = require("../middleware/auth");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/account", account);
  app.use(authentication);
  app.use("/api/obras", obras);
  app.use("/api/orcamento", orcamento);
};
