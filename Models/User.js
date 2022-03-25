const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
      enum: { values: ["Admin", "Employee"] },
    },
    boardManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BoardManager",
      default: null,
    },
  },
  { timestamps: true }
);

const User = global.User || mongoose.model("User", userSchema);
module.exports = User;
