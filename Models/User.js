const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  roll: {
    type: String,
  },
});

const User = global.User || mongoose.model("User", userSchema);
module.exports = User;
