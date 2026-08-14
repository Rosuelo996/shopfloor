import express from "express";
import { getDashboard, getLatestHandover, getYesterday } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getDashboard);
router.get("/yesterday", getYesterday)
router.get("/latest", getLatestHandover)

export default router;