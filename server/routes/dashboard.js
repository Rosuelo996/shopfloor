import express from "express";
import { getDashboard, getYesterday } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getDashboard);
router.get("/yesterday", getYesterday)

export default router;