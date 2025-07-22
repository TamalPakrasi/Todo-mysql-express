import TodoServices from "../services/todo.service.js";

// @desc GET fetch all todos
// @route GET /api/todos
export const fetchAll = async (req, res, next) => {
  try {
    const operationStatus = await TodoServices.fetchTodo();
    console.log("FETCH ALL TODOS");
    console.log(`operation status:\n${operationStatus}`);
    res.status(200).json({ operationStatus });
  } catch (error) {
    next(error);
  }
};

// @desc POST create new todo
// @route POST /api/todos
export const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    console.log("CREATE TODO");
    console.log({ title, description });

    if (title.trim().length === 0 || description.trim().length === 0)
      throw new Error("Invalid Title or Description");

    const operationStatus = await TodoServices.createTodo({
      title,
      description,
    });

    console.log(`operation status:\n${operationStatus}`);

    res.status(201).json({ operationStatus });
  } catch (error) {
    next(error);
  }
};

// @desc PUT update todo
// @route PUT /api/todos/:id
export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    console.log("CREATE TODO");
    console.log({
      id,
      title,
      description,
      isCompleted,
    });
    const operationStatus = await TodoServices.updateTodo(id, {
      title,
      description,
      isCompleted: isCompleted ? "Y" : "N",
    });
    console.log(`operation status:\n${operationStatus}`);
    res.status(201).json({ operationStatus });
  } catch (error) {
    next(error);
  }
};
