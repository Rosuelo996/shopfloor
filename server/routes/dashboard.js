import express from "express";
import { getDashboard, getYesterdaySummary, getWeeklySales } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getDashboard);
router.get("/yesterday", getYesterdaySummary)
router.get("/weekly-sales", getWeeklySales)

export default router;