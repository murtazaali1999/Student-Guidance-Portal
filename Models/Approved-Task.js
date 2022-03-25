const mongoose = require("mongoose");

const approvedTaskSchema = new mongoose.Schema(
  {
    taskid: {
      type: mongoose.Types.ObjectId,
      ref: "Task",
    },
    request: {
      enum: {
        type: String,
        values: ["Approved", "Rejected", "Pending"],
        default: "Pending",
      },
    },
    userNote: { type: String }, // this is users repsonse
    response: { type: String }, //this is board-manager response
  },
  { timestamps: true }
);

const ApprovedTask =
  global.ApprovedTask || mongoose.model("ApprovedTask", approvedTaskSchema);
module.exports = ApprovedTask;
