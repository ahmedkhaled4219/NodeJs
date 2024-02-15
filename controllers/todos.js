const Todos = require("../models/todos");

const createTodo = async (req, res) => {
  const newTodo = await Todos.create({...req.body, userId: req.userId});
  res.json(newTodo);
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  const deleteTodo = await Todos.findByIdAndDelete(todoId);
  res.json(deleteTodo);
};

const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = await Todos.findByIdAndUpdate(todoId, req.body);
  res.json(updatedTodo);
};

const getTodosbyFilter = async (req, res, next) => {
  try {
    let { limit = 10, skip = 0, status } = req.query;
    limit = parseInt(limit, 10);
    skip = parseInt(skip, 10);

    const query = {};
    if (status) {
      query.status = status;
    }
    const todos = await Todos.find(query).limit(limit).skip(skip).exec()
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  deleteTodo,
  updateTodo,
  getTodosbyFilter,
};
