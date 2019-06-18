const mongoose = require("mongoose");
const { roleName } = require("../auxiliares/roleName");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    unique: true
  },
  password: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 1024
  },
  role: {
    type: String,
    required: true,
    enum: [roleName.socio, roleName.geral, roleName.admin]
  }
});

userSchema.methods.generateAuthToken = function() {
  //video 135
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(10)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    role: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

function validateLogin(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

exports.User = User;
exports.validateUser = validate;
exports.validateLogin = validateLogin;
