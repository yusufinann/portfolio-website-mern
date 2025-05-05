import express from "express";
import { intro, updateIntro } from "../controllers/intro.controller.js";

const router = express.Router();

// Yeni bir intro oluşturma route'u
router.post("/", intro);
router.post("/update-intro",updateIntro)

export default router;