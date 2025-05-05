import express from "express";
import { projects, updateprojects, getAllProjects, deleteProject } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", projects);
router.post("/update-project", updateprojects);
router.get("/", getAllProjects);
router.delete("/:id", deleteProject);

export default router;