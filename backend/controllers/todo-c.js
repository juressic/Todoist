const TodoSchema = require('../models/Todo.js');
const Users = require('../models/Users.js');
const { UserTodos } = require('./user-c.js');

const GetMyTodos = async (req, res, next) => {
  try {
    const toDos = await TodoSchema.find();
    res.status(200).json(toDos);
  } catch (err) {
    next(err);
  }
};

const PostMyTodo = async (req, res, next) => {
  try {
    const newTodo = new TodoSchema({
      title: req.body.title,
    });
    await newTodo.save();

    try {
      const user = await Users.findById(req.params.id);
      await Users.findByIdAndUpdate(req.params.id, {
        $push: { todos: newTodo._id },
      });
      console.log(newTodo);
    } catch (err) {
      next(err);
    }
    res.status(200).json(newTodo);
  } catch (err) {
    next(err);
  }
};

const EditMyTodo = async (req, res, next) => {
  try {
    const editTodo = await TodoSchema.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).json(editTodo);
  } catch (err) {
    next(err);
  }
};

const DeleteMyTodo = async (req, res, next) => {
  try {
    const todoDelete = await TodoSchema.findByIdAndRemove({
      _id: req.body._id,
    });

    const currentUser = await Users.findByIdAndUpdate(
      { _id: req.params.id },
      { $pullAll: { todos: [{ _id: req.body._id }] } },
      { new: true }
    ).then((todos) => console.log(todos));

    res.send(200);
  } catch (err) {
    next(err);
  }
};

module.exports = { GetMyTodos, PostMyTodo, EditMyTodo, DeleteMyTodo };
