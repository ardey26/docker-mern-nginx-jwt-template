const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateName = (name) => {
  const re = /^[ a-zA-Z\-\’]+$/;
  return re.test(name);
};
const requiredName = {
  type: String,
  required: [true, "Please add a name."],
  validate: [validateName, "Please add a valid name."],
};

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const requiredEmail = {
  type: String,
  trim: true,
  lowercase: true,
  required: [true, "Please add an email."],
  unique: true,
  validate: [validateEmail, "Please provide a valid email address."],
};

const validateUsername = (username) => {
  const re = /^[A-Za-z][A-Za-z0-9_]{5,29}$/;

  return re.test(username);
};
const requiredUsername = {
  type: String,
  required: [true, "Please add a username."],
  min: 6,
  max: 50,
  unique: true,
  validate: [validateUsername, "Please provide a valid username"],
};
// Minlen: 6, maxlen: 50, can contain alphanumeric as well as underscore.

const requiredPassword = {
  type: String,
  required: [true, "Please add a password."],
  min: 8,
};
// Minlen: 8, must contain: numbers; alphanumeric. Can contain special chars, and doesn't need uppercase.

const defArray = {
  type: Array,
  default: [],
};
const UserSchema = new Schema(
  {
    name: requiredName,
    email: requiredEmail,
    username: requiredUsername,
    password: requiredPassword,
    friends: defArray,
    sentRequests: defArray,
    receivedRequests: defArray,
    avatar: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
