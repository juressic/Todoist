const Users = require('../models/Users.js');
const Todos = require('../models/Todo.js');
const mongoose = require('mongoose');

const AllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
};

const UserTodos = async (req, res, next) => {
  try {
    const myData = await Users.findById(req.params.id);
    const myTodosId = myData.todos;

    const todos = await Todos.find({ _id: { $in: myTodosId } });

    res.json(todos);
  } catch (err) {
    next(err);
  }
};

module.exports = { AllUsers, UserTodos };
