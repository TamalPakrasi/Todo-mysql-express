import { Router } from "express";
import { fetchAll, createTodo, updateTodo } from "../../controllers/fetchAll.controller.js";

const router = Router();

router.get("/", fetchAll);
router.post("/", createTodo);
router.put("/:id", updateTodo);

export default router;
