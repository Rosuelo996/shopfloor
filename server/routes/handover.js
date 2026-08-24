import express from "express";
import { getLatestHandover, updateHandoverItem, handleHandoverAcknowledgement } from "../controllers/handoverController.js";

const router = express.Router();

router.get("/latest", getLatestHandover);
router.patch("/follow-ups/:id", updateHandoverItem)
router.patch("/:handoverId/acknowledge", handleHandoverAcknowledgement);

export default router;