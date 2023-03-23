const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
