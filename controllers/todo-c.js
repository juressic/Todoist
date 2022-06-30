import TodoSchema from '../models/Todo.js';

export const GetMyTodos = async (req, res, next) => {
  try {
    const toDos = await TodoSchema.find();
    res.status(200).json(toDos);
  } catch (err) {
    next(err);
  }
};

export const PostMyTodo = async (req, res, next) => {
  try {
    const newTodo = new TodoSchema({
      title: req.body.title,
    });

    newTodo.save();
    res.status(200).json(newTodo);
  } catch (err) {
    next(err);
  }
};

export const EditMyTodo = async (req, res, next) => {
  try {
    const editTodo = await TodoSchema.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).json(editTodo);
  } catch (err) {
    next(err);
  }
};
