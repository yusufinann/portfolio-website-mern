import express from "express"
import { About, Contact, Course, Experience, Intro, Project } from "../models/portfolioModel.js";

const router=express.Router();

router.get("/get-portfolio-data",async(req,res)=>{
    try {
        const intros=await Intro.find();
        const abouts=await About.find();
        const projects=await Project.find();
        const contacts=await Contact.find();
        const experiences=await Experience.find();
        const courses=await Course.find();

        res.status(200).send({
            intro:intros[0],
            about:abouts[0],
            projects:projects,
            contact:contacts[0],
            experiences:experiences,
            courses:courses
        })
    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;