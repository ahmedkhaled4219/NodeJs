const Users = require("../models/users");
const Todos = require("../models/todos");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const getUsersFirstname = async (req, res) => {
  const usersFirstname = await Users.find({}).select("firstname");
  res.json(usersFirstname);
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await Users.findByIdAndUpdate(userId, req.body, {
      runValidators: true,
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await Users.findByIdAndDelete(userId);
  res.json(deletedUser);
};

const findUserTodos = async (req, res) => {
  const userTodos = await Todos.find({ userId: req.params.id });
  res.json(userTodos);
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "Invalid username or Passwrod" });
  }
  const valid = await user.verifyPassword(password);
  if (!valid) {
    return res.status(401).json("Invalid username or Passwrod");
  }
  const token = jwt.sign({ userId: user.id }, "dfs.hfjf4r8;95t7;treglgh3233d", {
    expiresIn: "1d",
  });
  return res.json({ token });
};


module.exports = {
  createUser,
  getUsersFirstname,
  deleteUser,
  findUserTodos,
  updateUser,
  userLogin,
  
};
