import { Router } from "express";
import { fetchAll, createTodo } from "../../controllers/fetchAll.controller.js";

const router = Router();

router.get("/", fetchAll);
router.post("/", createTodo);

export default router;
