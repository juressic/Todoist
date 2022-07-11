//IMPORTS
import express from 'express';
import TodoRoute from './routes/todo.js';
import AuthRoute from './routes/auth.js';
import mongoose from 'mongoose';
import UsersRoute from './routes/user.js';
import dotenv from 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
//EXPRESS CONNECTION
const port = 5555;
const app = express();
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

/*const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));*/

//MIDDLEWARES
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(TodoRoute);
app.use(AuthRoute);
app.use(UsersRoute);
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
