import express from "express";
import { getDailyShifts, getWeeklyShifts, getTeamAvailability } from "../controllers/teamController.js";

const router = express.Router()

router.get("/shifts/daily", getDailyShifts)
router.get("/shifts/weekly", getWeeklyShifts)

router.get("/availability", getTeamAvailability)

export default router