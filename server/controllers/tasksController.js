import { fetchTasksByDate, updateTaskStatusById } from "../services/tasksService.js";

export async function getTasksByDate(req, res, next) {
  try {
    const date = req.query.date || "2026-08-31";
    const tasks = await fetchTasksByDate(date);

    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function updateTaskStatus(req, res, next) {
  try {
    const { id } = req.params
    const { status } = req.body

    const updatedTaskStatus = await updateTaskStatusById(id, status)
    res.json(updatedTaskStatus)
  } catch (err) {
    next(err)
  }
}