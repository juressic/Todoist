const express = require('express');
const router = express.Router();

const {
  GetMyTodos,
  PostMyTodo,
  EditMyTodo,
  DeleteMyTodo,
} = require('../controllers/todo-c.js');
//import { VerifyUser } from '../utilities/verifyToken.js';

router.get('/todo/:id', GetMyTodos);
router.post('/todo/:id', PostMyTodo);
router.put('/todo/:id', EditMyTodo);
router.delete('/todo/:id', DeleteMyTodo);

module.exports = router;
