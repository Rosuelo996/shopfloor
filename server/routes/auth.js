import express from "express";
import { createDemoToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/demo", createDemoToken);

export default router
