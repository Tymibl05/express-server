import express from 'express';

import { data } from './data.js';
const users = data.users;

const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));

app.get('/db', (req, res) => {
  res.send(users);
}); // getUsers -- only for testing

app.get('/:userId', (req, res) => {
  const id = req.params.userId;
  const reqUser = users.find((user) => user.id == id);
  res.send(reqUser);
}); // getUser -- this is what will be called post authenticated sign-in. auth will pass uid

app.get('/:userId/tasks', (req, res) => {
  const id = req.params.userId;
  const reqUser = users.find((user) => user.id == id);
  res.send(reqUser.tasks);
}); // getTasks

app.get('/:userId/task/:taskId', (req, res) => {
  const id = req.params.userId;
  const reqUser = users.find((user) => user.id == id);
  const reqTask = reqUser.tasks.find((task) => task.id == req.params.taskId);
  res.send(reqTask);
}); // getTaskById

app.get('/:userId/tasks/:filter', (req, res) => {
  const id = req.params.userId;
  const reqUser = users.find((user) => user.id == id);
  const filteredTasks = reqUser.tasks.filter(
    (task) => task.status == req.params.filter
  );
  res.send(filteredTasks);
}); // filterTasks
