import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  todos: {
    type: [String],
    default: [{}],
  },
});

export default mongoose.model('User', UserSchema);
