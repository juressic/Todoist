import jwt from 'jsonwebtoken';
import { createError } from '../utilities/error.js';

export const VerifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, 'User is not authenticated'));
  } else {
    console.log('Token Verified');
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid'));
    req.user = user;

    next();
  });
};

export const VerifyUser = (req, res, next) => {
  VerifyToken(req, res, () => {
    console.log(req.user.id + ' ' + req.params.id);
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, 'You are not authorized'));
    }
  });
};
