const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    status: {
      type: String,
      enum: { values: ["Opened", "Closed"], default: "Opened" },
    }, //open or closed
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    fileUpload: { type: String, default: "..." },
  },
  { timestamps: true }
);

const Task = global.Task || mongoose.model("Task", taskSchema);
module.exports = Task;
