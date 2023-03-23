const UserSchema = require('../models/Users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createError } = require('../utilities/error.js');

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new UserSchema({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });

    await newUser.save();
    res.status(200).send('User has been created.').json(newUser);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const userData = await UserSchema.findOne({
      username: req.body.username,
    });

    const checkPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    console.log(checkPassword);

    if (!checkPassword)
      return next(createError(400, 'Wrong password or username!'));

    const token = jwt.sign({ id: userData._id }, process.env.JWT);

    const { password, __v, todos, ...otherDetails } = userData._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  try {
    localStorage.removeItem('access_token');
    res.send('Logout successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logout };
