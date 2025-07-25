import pool from "../config/db.config.js";
import databaseError from "../utils/errors/databaseError.error.js";

//fetch all todos
export const fetchAllTodos = async () => {
  try {
    const [allTodos] = await pool.query("SELECT * FROM todo_table");
    console.log(`Coming from modal\n${allTodos}`);
    return allTodos;
  } catch (error) {
    console.log(error);
    if (error.message.length > 0) throw databaseError(error.message);
    throw databaseError();
  }
};

//fetch todo by id
export const fetchTodoByID = async (id) => {
  try {
    const [todo] = await pool.query("SELECT * FROM todo_table WHERE id = ?", [
      id,
    ]);
    console.log(`Coming from modal\n${todo}`);
    return todo;
  } catch (error) {
    console.log(error);
    if (error.message.length > 0) throw databaseError(error.message);
    throw databaseError();
  }
};

//add new todo
export const addNewTodo = async ({ title, description }) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO todo_table (title, description) VALUES (?, ?)",
      [title, description]
    );
    console.log(result);
    return result.insertId;
  } catch (error) {
    throw databaseError();
  }
};

//update a todo
export const updateTodo = async (id, { title, description, isCompleted }) => {
  try {
    const [result] = await pool.query(
      "UPDATE todo_table SET title = ?, description = ?, isCompleted = ? WHERE id = ?",
      [title, description, isCompleted, id]
    );
    console.log(result);
    return result.affectedRows;
  } catch (error) {
    throw databaseError();
  }
};

//delete a todo
export const deleteTodo = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM todo_table WHERE id = ?", [
      id,
    ]);
    return result.affectedRows;
  } catch (error) {
    throw databaseError();
  }
};
