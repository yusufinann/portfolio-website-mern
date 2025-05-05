import express from "express"
import { courses,deleteCourse,updatecourse } from "../controllers/course.controller.js";
const router=express.Router();

router.post("/",courses);
router.post("/update-course",updatecourse);
router.delete("/:id", deleteCourse);

export default router;