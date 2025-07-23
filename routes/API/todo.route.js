import { Router } from "express";
import {
  fetchAll,
  createTodo,
  updateTodo,
  deleteTodo,
  fetchOneTodo,
} from "../../controllers/todos.controller.js";

const router = Router();

router.get("/", fetchAll);
router.get("/:id", fetchOneTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
