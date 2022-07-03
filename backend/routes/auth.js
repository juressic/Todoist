import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/auth-c.js';

router.post('/register', register);
router.get('/login', login);

export default router;
