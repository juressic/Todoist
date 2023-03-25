//IMPORTS
const express = require('express');
const TodoRoute = require('./routes/todo.js');
const AuthRoute = require('./routes/auth.js');
const mongoose = require('mongoose');
const UsersRoute = require('./routes/user.js');
const dotenv = require('dotenv/config');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
//EXPRESS CONNECTION
const port = 5555;
const app = express();
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

const corsOptions = {
  origin: 'http://127.0.0.1:5555',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
//MIDDLEWARES
//app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(TodoRoute);
app.use(AuthRoute);
app.use(UsersRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//ERROR HANDLER
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something is not correct!';
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

mongoose.connect(process.env.DB_LINK, () => console.log('Database connected!'));
