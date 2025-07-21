import * as todoModal from "../models/todo.model.js";
import dataNotFound from "../utils/errors/dataNotFound.error.js";

//fetch all todo service
export const fetchAllTodoService = async () => {
  const allTodos = await todoModal.fetchAllTodos();
  if (allTodos.length === 0) return [];
  return allTodos;
};

//create new entry
export const createNewTodoService = async (data) => {
  return await todoModal.addNewTodo(data);
};

//update a todo
export const updateTodoService = async (id, newData) => {
  const affected = await todoModal.updateTodo(id, newData);
  if (!affected) throw dataNotFound("Failed to Update");
  return affected;
};

// delete a todo
export const deleteTodoService = async (id) => {
  const affected = await todoModal.deleteTodo(id);
  if (!affected) throw dataNotFound("Failed to delete");
  return affected;
}
