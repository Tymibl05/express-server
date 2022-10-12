import express from 'express';
import {
  addTask,
  deleteTaskById,
  filterTasks,
  getTaskById,
  getTasks,
  updateCheckTime,
  updateTaskById,
} from './controllers/task.js';
import {
  addEmployee,
  deleteEmpById,
  getEmpById,
  getEmployees,
  getUserById,
  updateEmpById,
  updateUserById,
} from './controllers/user.js';

import { data } from './data.js';
const users = data.users;

const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
// add seedRouter

app.get('/db', (req, res) => {
  res.send(users);
}); // getUsers -- only for testing

app.get('/:userId', getUserById); // called post authenticated sign-in. auth will pass uid
app.patch('/:userId', updateUserById);
app.get('/:userId/employees', getEmployees);
app.post('/:userId/employees', addEmployee);
app.get('/:userId/employee/:empId', getEmpById);
app.patch('/:userId/employee/:empId', updateEmpById);
app.delete('/:userId/employee/:empId', deleteEmpById); //***archive removed employees into another collection

app.get('/:userId/tasks', getTasks);
app.get('/:userId/tasks/:filter', filterTasks); // is this needed?
app.get('/:userId/task/:taskId', getTaskById);
app.post('/:userId/tasks', addTask); // addTask
app.patch('/:userId/task/:taskId', updateTaskById); // updateTaskById
app.delete('./:userId/task/:taskId', deleteTaskById); //***archive removed tasks into another collection
app.patch('/:userId/:taskId/:empId', updateCheckTime);
