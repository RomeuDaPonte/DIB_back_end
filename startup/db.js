const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function() {
  mongoose.set("useCreateIndex", true);

  const db = "mongodb://localhost/dib4t";
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => winston.info(`Connected to ${db}...`));
};
