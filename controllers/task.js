import { v4 as uuidv4 } from 'uuid';
import { data } from '../data.js';
const users = data.users;

export const getTasks = (req, res) => {
  const { userId } = req.params;
  const reqUser = users.find((user) => user.id == userId);
  res.send(reqUser.tasks);
};

export const filterTasks = (req, res) => {
  const { userId } = req.params;
  const reqUser = users.find((user) => user.id == userId);
  const filteredTasks = reqUser.tasks.filter(
    (task) => task.status == req.params.filter
  );
  res.send(filteredTasks);
};

export const getTaskById = (req, res) => {
  const { userId } = req.params;
  const reqUser = users.find((user) => user.id == userId);
  const reqTask = reqUser.tasks.find((task) => task.id == req.params.taskId);
  res.send(reqTask);
};

export const addTask = (req, res) => {
  const { userId } = req.params;
  const task = req.body;
  const reqUser = users.find((user) => user.id == userId);
  // add -> requested: timestamp
  reqUser.tasks.push({ ...task, status: 'pending', id: uuidv4() });
  res.send(`New task has been added.`);
};

export const updateTaskById = (req, res) => {
  const { userId, taskId } = req.params;
  const { description, timeframe, employees, status } = req.body;
  // add emp check to only push new emp into array so current emp check times dont get erased

  const reqUser = users.find((user) => user.id == userId);
  const reqTask = reqUser.tasks.find((task) => task.id == taskId);

  if (description) reqTask.description = description;
  if (timeframe) reqTask.timeframe = timeframe;
  if (employees) reqTask.employees = employees;
  if (status) reqTask.status = status;

  res.send(`Task ${reqTask.id} has been updated.`);
};

export const deleteTaskById = (req, res) => {
  const { userId, taskId } = req.params;
  const reqUser = users.find((user) => user.id == userId);
  reqUser.tasks = reqUser.tasks.filter((task) => task.id !== taskId);
  res.send(`Task ${taskId} has been deleted`);
};

export const updateCheckTime = (req, res) => {
  const { userId, taskId, empId } = req.params;
  const { checkIn, checkOut } = req.body;
  const reqUser = users.find((user) => user.id == userId);
  const reqTask = reqUser.tasks.find((task) => task.id == taskId);
  const reqEmp = reqTask.employees.find((emp) => emp.id == empId);

  if (checkIn) {
    if (reqEmp.checkIn.length > reqEmp.checkOut.length)
      return (
        res
          // .error(404)
          .send(
            `ERROR: ${reqEmp.name} is ALREADY checked in for task ${reqTask.id}`
          )
      );
    reqEmp.checkIn.push(checkIn);
    res.send(`${reqEmp.name} has checked in for task ${reqTask.id}`);
  }
  if (checkOut) {
    reqEmp.checkOut.push(checkOut);
    res.send(`${reqEmp.name} has checked out for task ${reqTask.id}`);
  }
}; //
