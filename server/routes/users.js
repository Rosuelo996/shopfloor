import express from "express";
import { getDemoUsers, getCurrentUser } from "../controllers/usersController.js";

const router = express.Router()

router.get("/demo", getDemoUsers)
router.get("/me", getCurrentUser)

export default router