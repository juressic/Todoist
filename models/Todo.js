import mongoose from 'mongoose';

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

export default mongoose.model('Todo', TodoSchema);
