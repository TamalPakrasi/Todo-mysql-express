import { Router } from "express";
import {
  fetchAll,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../controllers/fetchAll.controller.js";

const router = Router();

router.get("/", fetchAll);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
