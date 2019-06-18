const { User } = require("../models/user");

module.exports = async function createAdmin() {
  let user = await User.findOne({ email: "felix.francisco@dib4t.com" });

  if (user) {
    console.log("User admin já existe na base da dados!");
    return;
  }

  const adminUser = new User({
    name: "Felix Francisco",
    role: "Administrador",
    email: "felix.francisco@dib4t.com",
    password: "$2b$10$imtB1ndHXQot4FMUcXG0W.a.cniWhZDkjzbMA9wg0.julrkzd7luS"
  });

  await adminUser.save();

  console.log("Admin user criado com sucesso!");
};
