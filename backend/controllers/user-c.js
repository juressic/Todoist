import Users from '../models/Users.js';
import Todos from '../models/Todo.js';
import mongoose from 'mongoose';

export const AllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
};

export const UserTodos = async (req, res, next) => {
  try {
    const myData = await Users.findById(req.params.id);
    const myTodosId = myData.todos;

    const todos = await Todos.find({ _id: { $in: myTodosId } });

    res.json(todos);
  } catch (err) {
    next(err);
  }
};
