import express from "express";
import { getLatestHandover, updateHandoverItem } from "../controllers/handoverController.js";

const router = express.Router();

router.get("/latest", getLatestHandover);
router.patch("/follow-ups/:id", updateHandoverItem)

export default router;