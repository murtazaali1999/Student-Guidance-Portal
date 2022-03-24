const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  status: { enum: { values: ["Opened", "Closed"], default: "Opened" } }, //open or closed
  assigned: { type: mongoose.Types.ObjectId, default: null },
  fileUpload: { type: String },
  dateCreated: { timestamps: true },
});

const Task = global.Task || mongoose.model("Task", taskSchema);
module.exports = Task;
