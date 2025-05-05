import express from "express";
import { experience, getAllExperiences, updateexperience, deleteExperience } from "../controllers/experience.controller.js";

const router = express.Router();

router.post("/", experience);
router.post("/update-experience", updateexperience);
router.get("/", getAllExperiences);
router.delete("/:id", deleteExperience);

export default router;