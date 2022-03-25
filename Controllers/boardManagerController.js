const mongoose = require("mongoose");
const User = require("../Models/User");
const Task = require("../Models/Task");
const BoardManager = require("../Models/BoardManager");
const ApprovedTask = require("../Models/Approved-Task");

module.exports = {
  createtask: async (req, res, next) => {
    const { name, description, status } = req.body;

    if (!name || !description || !status)
      res.status(500).json({ error: "one or more fields are empty" });

    const foundBm = await BoardManager.findOne({ _id: req.params.bm_id })
      .populate("createdTasks")
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });

    if (!foundBm || foundBm == null)
      return res
        .status(404)
        .json({ error: "There is no board manager with this id" });

    console.log(foundBm);

    let taskNameCheck = false;
    foundBm.createdTasks.map((task) => {
      console.log(task.name, name);
      if (task.name == name) {
        taskNameCheck = true;
      }
    });

    if (taskNameCheck == true)
      return res
        .status(400)
        .json({ message: "Task already exists with this name" });

    const newTask = new Task({
      name,
      description,
      status,
    });

    foundBm.createdTasks.push(newTask._id);

    foundBm
      .save()
      .then(() => {
        console.log("Board Manager Saved Successfully");
      })
      .catch((err) => {
        return console.log(err.message);
      });

    await newTask
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Task Created Successfully", task: newTask });
      })
      .catch((err) => {
        return res.status(400).json({ error: err.message });
      });
  },
  assignEmployee: async (req, res, next) => {
    const user = await User.findOne({ _id: req.params.u_id }).catch((err) => {
      return res.status(500).json({ error: err.message });
    });

    if (user == {} || user == null)
      return res.status(400).json({ error: "User not Found" });

    if (user.boardManager != null)
      return res
        .status(500)
        .json({ error: "User already belongs to a board manager" });

    const task = await Task.findOne({ _id: req.body.t_id });

    if (task == {} || task == null)
      return res.status(400).json({ error: "Task not Found" });

    if (task.user != null)
      return res
        .status(500)
        .json({ error: "Task already belongs to another user" });

    user.boardManager = req.params.b_id;
    task.user = user._id;

    await user
      .save()
      .then(() => {
        return console.log("user board manager updated");
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });

    await task
      .save()
      .then(() => {
        res.status(200).json({
          message: "Updated task and user successfully",
          Task: task,
          User: user,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },

  getAllRequests: async (req, res, next) => {
    const requests = await ApprovedTask.find()
      .populate("taskid")
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
    if (requests == [] || requests == null)
      return res.status(404).json({ error: "requests do not exist" });

    return res.status(200).json({ message: requests });
  },
  insertResponseNote: async (req, res, next) => {
    const { response } = req.body;
    const foundRequest = await ApprovedTask.findOne({
      _id: req.params.at_id,
    }).catch((err) => {
      return res.status(500).json({ error: err.message });
    });

    if (!foundRequest)
      return res.status(404).json({ message: "request not found" });
    foundRequest.response = response;

    await foundRequest
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Response updated successfully in request" });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
  updateRequestStatus: async (req, res, next) => {
    const { request } = req.body;
    const foundRequest = await ApprovedTask.findOne({
      _id: req.params.at_id,
    }).catch((err) => {
      return res.status(500).json({ message: err.message });
    });
    if (!foundRequest)
      return res.status(404).json({ message: "request not found" });

    foundRequest.request.enum = request;

    await foundRequest
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Response updated successfully in request" });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
  getboardmanagerbytask: async (req, res, next) => {
    const task = await Task.find({ _id: req.params.t_id })
      .populate({
        path: "user",
        populate: {
          path: "boardManager",
        },
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
    if (task == null)
      return res.status(400).json({ message: "does not exist" });

    return res.status(200).json({ message: task });
  },
};
