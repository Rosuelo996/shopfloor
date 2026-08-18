import { fetchLatestHandover, updateHandoverItemCompleted } from "../services/handoverService.js";

export async function getLatestHandover(req, res, next) {
  try {
    const date = req.query.date || "2026-08-31"
    const handover= await fetchLatestHandover(date);

    res.json(handover)
  } catch(err) {
    next(err)
  }
}

export async function updateHandoverItem (req, res, next) {
  try {
    const { id } = req.params
    const { completed } = req.body

    const updatedItem = await updateHandoverItemCompleted(id, completed)

    res.json(updatedItem)
  }
 
  catch (err) {
    next(err)
  }
}