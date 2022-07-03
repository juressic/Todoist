import express from 'express';
const router = express.Router();

import { GetMyTodos, PostMyTodo, EditMyTodo } from '../controllers/todo-c.js';

router.get('/todo/:id', GetMyTodos);
router.post('/todo/:id', PostMyTodo);
router.put('/todo/:id', EditMyTodo);

export default router;
