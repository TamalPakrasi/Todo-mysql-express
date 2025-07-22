import TodoServices from "../services/todo.service.js";

// @desc GET fetch all todos
// @route GET /api/todos
export const fetchAll = async (req, res, next) => {
  try {
    const todos = await TodoServices.fetchTodo();
    res.status(200).json({ todos });
  } catch (error) {
    next(error);
  }
};
