import * as todoModal from "../models/todo.model.js";
import dataNotFound from "../utils/errors/dataNotFound.error.js";

export default class TodoServices {
  static async fetchTodo() {
    const allTodos = await todoModal.fetchAllTodos();
    return {
      success: true,
      message: allTodos.length > 0 ? "all Todos obatined" : "No Todo Obtained",
      data: allTodos,
    };
  }

  static async createTodo(data) {
    const insertId = await todoModal.addNewTodo(data);
    // return object like real-world API patterns.
    return {
      success: true,
      message: "New Todo created",
      data: insertId,
    };
  }

  static async updateTodo(id, newData) {
    const affected = await todoModal.updateTodo(id, newData);
    if (!affected) throw dataNotFound("Failed to Update");
    return {
      success: true,
      message: "Todo updated",
      data: affected,
    };
  }

  static async deleteTodo(id) {
    const affected = await todoModal.deleteTodo(id);
    if (!affected) throw dataNotFound("Failed to delete");
    return {
      success: true,
      message: "Todo deleted",
      data: affected,
    };
  }
}
