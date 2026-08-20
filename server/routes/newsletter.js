import express from "express";
import { getNewsletter } from "../controllers/newsletterController.js";

const router = express.Router();

router.get("/", getNewsletter);

export default router;