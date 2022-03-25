const mongoose = require("mongoose");
const User = require("../Models/User");
const Task = require("../Models/Task");
const BoardManager = require("../Models/BoardManager");
const ApprovedTasks = require("../Models/Approved-Task");

module.exports = {
  getAllTasks: async (req, res, next) => {
    const tasks = await Task.find();
    if (!tasks) return res.status(404).json({ error: "no tasks were found" });
    return res.status(200).json({ Tasks: tasks });
  },
  getTaskById: async (req, res, next) => {
    const tasks = await Task.findOne({ _id: req.params.t_id });
    console.log(tasks);
    if (!tasks || tasks == null)
      return res.status(404).json({ error: "no tasks were found" });

    return res.status(200).json({ Tasks: tasks });
  },
  getApprovedRequestById: async (req, res, next) => {
    const tasks = await ApprovedTasks.find({ _id: req.params.t_id });
    if (!tasks) return res.status(404).json({ error: "no tasks were found" });
    return res.status(200).json({ Tasks: tasks });
  },
  getAllApprovedRequest: async (req, res, next) => {
    const requests = await ApprovedTasks.find({
      "request.enum": "Approved",
    }).catch((err) => {
      return res.status(500).json({ message: err.message });
    });
    if (!requests)
      return res.status(404).json({ error: "no tasks were found" });
    return res.status(200).json({ Requests: requests });
  },
  getAllRejectRequest: async (req, res, next) => {
    const requests = await ApprovedTasks.find({
      "request.enum": "Rejected",
    }).catch((err) => {
      return res.status(500).json({ message: err.message });
    });
    if (!requests)
      return res.status(404).json({ error: "no tasks were found" });
    return res.status(200).json({ Requests: requests });
  },
  getAllPendingRequest: async (req, res, next) => {
    const requests = await ApprovedTasks.find({
      "request.enum": "Pending",
    }).catch((err) => {
      return res.status(500).json({ message: err.message });
    });
    if (!requests)
      return res.status(404).json({ error: "no tasks were found" });
    return res.status(200).json({ Requests: requests });
  },
};
