import TodoServices from "../services/todo.service.js";

// @desc GET fetch all todos
// @route GET /api/todos
export const fetchAll = async (req, res, next) => {
  try {
    const operationStatus = await TodoServices.fetchTodo();
    res.status(200).json({ operationStatus });
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    console.log(title, description);
    const operationStatus = await TodoServices.createTodo({
      title,
      description,
    });
    res.status(200).json({ operationStatus });
  } catch (error) {
    next(error);
  }
};
