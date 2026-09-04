import express from "express";
import { getDemoUsers, getCurrentUser, createNewUser } from "../controllers/usersController.js";

const router = express.Router()

router.get("/demo", getDemoUsers)
router.get("/me", getCurrentUser)
router.post("/", createNewUser);

export default router