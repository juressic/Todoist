import UserSchema from '../models/Users.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = await UserSchema({
    username: req.body.username,
    password: hash,
    email: req.body.email,
  });

  newUser.save();
};

export const login = async (req, res, next) => {
  const userData = await UserSchema.findById(req.params.id);

  const checkPassword = bcrypt.compare(req.body.password, userData.password);

  if (!checkPassword) return res.status(400).send('Password is not valid!');

  res.status(200).send('You are logged in');
};
