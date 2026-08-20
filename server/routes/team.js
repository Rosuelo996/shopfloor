import express from "express";
import { getShifts } from "../controllers/teamController.js";

const router = express.Router()

router.get("/shifts", getShifts)

export default router