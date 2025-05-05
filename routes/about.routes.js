import express from "express"
import { about, updateabout } from "../controllers/about.controller.js";

const router=express.Router();

router.post("/",about);
router.post("/update-about",updateabout);

export default router;