import express from "express";
import { createDemoToken, switchDemoUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/demo", createDemoToken);
router.post("/demo/switch", switchDemoUser)

export default router
