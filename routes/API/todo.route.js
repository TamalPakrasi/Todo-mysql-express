import { Router } from "express";
import { fetchAll } from "../../controllers/fetchAll.controller.js";

const router = Router();

router.get("/", fetchAll);

export default router;
