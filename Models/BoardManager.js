const mongoose = require("mongoose");

const boardManagerSchema = new mongoose.Schema(
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
    createdTasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Task",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const BoardManager =
  global.BoardManager || mongoose.model("BoardManager", boardManagerSchema);
module.exports = BoardManager;
