const { createAdminUser } = require("../models/user");
const { createDefaultPrecos } = require("../models/precos");

module.exports = async function seedBd() {
  await createDefaultPrecos();
  await createAdminUser();
};
