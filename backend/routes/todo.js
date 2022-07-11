import express from 'express';
const router = express.Router();

import {
  GetMyTodos,
  PostMyTodo,
  EditMyTodo,
  DeleteMyTodo,
} from '../controllers/todo-c.js';
import { VerifyUser } from '../utilities/verifyToken.js';

router.get('/todo/:id', GetMyTodos);
router.post('/todo/:id', PostMyTodo);
router.put('/todo/:id', EditMyTodo);
router.delete('/todo/:id', DeleteMyTodo);

export default router;
