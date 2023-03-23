const express = require('express');
const { AllUsers, UserTodos } = require('../controllers/user-c.js');
const router = express.Router();
//import { VerifyUser } from '../utilities/verifyToken.js';

router.get('/users', AllUsers);
router.get('/user/todos/:id', UserTodos);

module.exports = router;
