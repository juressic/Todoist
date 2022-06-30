import express from 'express';
const router = express.Router();

import { GetMyTodos, PostMyTodo, EditMyTodo } from '../controllers/todo-c.js';

router.get('/todo', GetMyTodos);
router.post('/todo', PostMyTodo);
router.put('/todo/:id', EditMyTodo);

export default router;
