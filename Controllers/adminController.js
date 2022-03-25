const mongoose = require("mongoose");
const User = require("../Models/User");
const Task = require("../Models/Task");
const BoardManager = require("../Models/BoardManager");

module.exports = {
  adminSignup: async (req, res, next) => {
    const { name, age, email, password, roll } = req.body;
    if (!name || !age || !email || !password || !roll)
      res.status(500).json({ error: "one or more fields are empty" });

    const newUser = new User({
      name,
      age,
      email,
      password,
      roll,
    });

    await newUser
      .save()
      .then(() => {
        return res.status(200).json({ error: "User saved Successfully" });
      })
      .catch((err) => console.log(err.message));
  },
  userLogin: async (req, res, next) => {
    //both employe and admin can login from this api
    const { email, password } = req.body;

    if (!email || !password)
      res.status(500).json({ error: "one or more fields are empty" });

    const foundUser = await User.findOne({
      email: email,
      password: password,
    }).select("-password");
    if (foundUser == {}) return res.status(400).json({ message: "Not Found" });
    else return res.status(200).json({ message: foundUser });
  },
  createtask: async (req, res, next) => {
    const { name, description, status } = req.body;

    if (!name || !description || !status)
      res.status(500).json({ error: "one or more fields are empty" });

    const newTask = new Task({
      name,
      description,
      status,
    });

    await newTask
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Task Created Successfully", task: newTask });
      })
      .catch((err) => {
        //RETURNS ERROR IF NOT ENUM VALUE
        res.status(400).json({ error: err.message });
      });
  },
  addEmployee: async (req, res, next) => {
    const { name, age, email, password } = req.body;
    if (!name || !age || !email || !password)
      res.status(500).json({ error: "one or more fields are empty" });

    const roll = "Employee";
    const newUser = new User({
      name,
      age,
      email,
      password,
      roll: roll,
    });

    await newUser
      .save()
      .then(() => {
        return res.status(200).json({ message: "Employee saved Successfully" });
      })
      .catch((err) => console.log(err.message));
  },
  addBoardManager: async (req, res, next) => {
    const { name, age, email, password } = req.body;
    if (!name || !age || !email || !password)
      res.status(500).json({ error: "one or more fields are empty" });

    const newBoardManager = new BoardManager({
      name,
      age,
      email,
      password,
    });

    await newBoardManager
      .save()
      .then(() => {
        return res.status(200).json({
          message: "Board Manager saved Successfully",
          BoardManager: newBoardManager,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  editTaskName: async (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(500).json({ message: "name is emtpy" });

    const findTask = await Task.findOne({ _id: req.params.t_id }).catch(
      (err) => {
        return res
          .status(404)
          .json({ error: "There was an error finding task" });
      }
    );
    if (findTask == {} || findTask == null)
      return res.status(404).json({ error: "This task does not exist" });

    findTask.name = name;
    await findTask
      .save()
      .then(() => {
        return res.status(200).json({ message: findTask });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  editTaskDescription: async (req, res, next) => {
    const { description } = req.body;
    if (!description)
      return res.status(500).json({ message: "description is emtpy" });

    const findTask = await Task.findOne({ _id: req.params.t_id }).catch(
      (err) => {
        return res
          .status(404)
          .json({ error: "There was an error finding task" });
      }
    );
    if (findTask == {} || findTask == null)
      return res.status(404).json({ error: "This task does not exist" });

    findTask.description = description;
    await findTask
      .save()
      .then(() => {
        return res.status(200).json({ message: findTask });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
  editTaskStatus: async (req, res, next) => {
    const { status } = req.body;
    if (!status) return res.status(500).json({ message: "status is emtpy" });

    const findTask = await Task.findOne({ _id: req.params.t_id }).catch(
      (err) => {
        return res
          .status(404)
          .json({ error: "There was an error finding task" });
      }
    );
    if (findTask == {} || findTask == null)
      return res.status(404).json({ error: "This task does not exist" });

    findTask.status = status;
    await findTask
      .save()
      .then(() => {
        return res.status(200).json({ message: findTask });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  },
};
