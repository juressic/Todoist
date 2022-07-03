import express from 'express';
import { AllUsers, UserTodos } from '../controllers/user-c.js';
const router = express.Router();
import { VerifyUser } from '../utilities/verifyToken.js';

router.get('/users', AllUsers);
router.get('/user/todos/:id', VerifyUser, UserTodos);

export default router;
