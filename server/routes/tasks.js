import express from "express";
import { getTasksByDate, updateTaskStatus } from "../controllers/tasksController.js"; 

const router = express.Router();

router.get("/", getTasksByDate);
router.patch("/:id", updateTaskStatus)

export default router;