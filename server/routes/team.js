import express from "express";
import { getShifts, getTeamAvailability } from "../controllers/teamController.js";

const router = express.Router()

router.get("/shifts", getShifts)
router.get("/availability", getTeamAvailability)

export default router