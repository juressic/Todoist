import express from 'express';
const app = express();
const port = 5555;
import TodoRoute from './routes/todo.js';
import mongoose from 'mongoose';

app.use(express.json());
app.use(TodoRoute);

app.get((err, req, res, next) => {
  console.log('Error');
  res.json(err);
});

mongoose.connect(
  'mongodb+srv://v4nt:RCCPgRdrTavLsx10@v4nt.4ky4y.mongodb.net/?retryWrites=true&w=majority'
);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
