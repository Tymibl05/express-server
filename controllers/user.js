import { v4 as uuidv4 } from 'uuid';
import { data } from '../data.js';
const users = data.users;

export const getUserById = (req, res) => {
  const id = req.params.userId;
  const reqUser = users.find((user) => user.id == id);
  res.send(reqUser);
};

export const updateUserById = (req, res) => {
  const { userId } = req.params;
  const { trust, name } = req.body;
  const reqUser = users.find((user) => user.id == userId);

  if (trust) reqUser.trust = trust;
  if (name) reqUser.name = name;

  res.send(`User ${reqUser.id} has been updated.`);
};

export const getEmployees = (req, res) => {
  const { userId } = req.params;
  const reqUser = users.find((user) => user.id == userId);
  res.send(reqUser.employees);
};

export const addEmployee = (req, res) => {
  const { userId } = req.params;
  const reqUser = users.find((user) => user.id == userId);
  // existingEmp check
  const newEmp = req.body;
  reqUser.employees.push({ ...newEmp, id: uuidv4(), activity: [] });
  res.send(`Employee ${newEmp.name} has been added.`);
};

export const getEmpById = (req, res) => {
  const { userId, empId } = req.params;
  const reqUser = users.find((user) => user.id == userId);
  const reqEmp = reqUser.employees.find((emp) => emp.id == empId);
  res.send(reqEmp);
};

export const updateEmpById = (req, res) => {
  const { userId, empId } = req.params;
  const { name, email } = req.body;

  const reqUser = users.find((user) => user.id == userId);
  const reqEmp = reqUser.employees.find((emp) => emp.id == empId);

  if (name) reqEmp.name = name;
  if (email) reqEmp.email = email;

  res.send(`Employee ${reqEmp.id} info has been updated.`);
};

export const deleteEmpById = (req, res) => {
  const { userId, empId } = req.params;
  const reqUser = users.find((user) => user.id == userId);
  reqUser.employees = reqUser.employees.filter((emp) => emp.id !== empId);
  res.send(`Employee ${empId} has been deleted.`);
};
