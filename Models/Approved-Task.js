const mongoose = require("mongoose");

const approvedTaskSchema = new mongoose.Schema({
  taskid: {
    type: mongoose.Types.ObjectId,
  },
  request: {
    enum: { values: ["Approved", "Rejected", "Pending"], default: "Pending" },
  },
  userNote: { type: String }, // this is users repsonse
  response: { type: String }, //this is board-manager response
});

const ApprovedTask =
  global.ApprovedTask || mongoose.model("ApprovedTask", approvedTaskSchema);
module.exports = ApprovedTask;
