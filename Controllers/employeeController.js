const mongoose = require("mongoose");
const User = require("../Models/User");
const Task = require("../Models/Task");
const BoardManager = require("../Models/BoardManager");
const ApprovedTask = require("../Models/Approved-Task");

module.exports = {
  createRequest: async (req, res, next) => {
    const { userNote } = req.body;
    if (!userNote) return res.status(404).json({ error: "User Note is empty" });

    const findTask = await Task.findOne({ _id: req.params.t_id })
      .populate("user")
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });

    const findApprovedTask = await ApprovedTask.findOne({
      taskid: req.params.t_id,
    }).catch((err) => {
      return res.status(500).json({ error: err.message });
    });

    if (findApprovedTask != null || findApprovedTask != {}) {
      return res
        .status(404)
        .json({ error: "This task already exists in approved category" });
    }

    if (findTask == {} || findTask == null)
      return res.status(404).json({ error: "Task not Found" });

    console.log(String(findTask.user._id), req.params.u_id);
    if (findTask.user == null || String(findTask.user._id) != req.params.u_id)
      return res.status(400).json({
        message:
          "Task does not have a user assigned to it or this user is not assigned to this task",
      });

    const findUser = await User.findOne({ _id: req.params.u_id }).catch(
      (err) => {
        return res.status(500).json({ error: err.message });
      }
    );

    if (findUser == null) {
      return res.status(400).json({
        message: "This user does not exist",
      });
    }

    const newRequest = new ApprovedTask({
      taskid: findTask._id,
      userNote,
    });

    await newRequest
      .save()
      .then(() => {
        res.status(200).json({ messag: "Request Created Successfully" });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },
  insertUserNoteRequest: async (req, res, next) => {
    const { userNote } = req.body;
    const foundRequest = await ApprovedTask.findOne({
      _id: req.params.at_id,
    }).catch((err) => {
      return res.status(500).json({ message: err.message });
    });
    if (!foundRequest || foundRequest == null)
      return res
        .status(404)
        .json({ message: "There is no request with this id" });

    foundRequest.userNote = userNote;

    await foundRequest
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Request Updated Successfully with User Response" });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
};
