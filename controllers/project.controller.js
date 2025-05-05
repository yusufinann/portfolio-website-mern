import { Project } from "../models/portfolioModel.js";

export const projects = async (req, res) => {
    try {
        const { title, description, image, link, technologies } = req.body;

        // Input validation
        if (!title || !image || !description || !link || !Array.isArray(technologies) || technologies.length === 0) {
            return res.status(400).json({ message: "All fields are obligatory and technologies must be a non-empty array" });
        }

        const newProject = new Project({
            title, description, image, link, technologies
        });
        
        // Save the project to the database
        await newProject.save();

        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error('Project creation error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateprojects = async (req, res) => {
    try {
        const { title, description, image, link, technologies } = req.body;

        // Input validation
        if (!title || !image || !description || !link || !Array.isArray(technologies) || technologies.length === 0) {
            return res.status(400).json({ message: "All fields are obligatory and technologies must be a non-empty array" });
        }
        
        const projects = await Project.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
       
        if (!projects) {
            return res.status(404).json({ message: "Project not found", success: false });
        }
        
        // Successful response
        res.status(200).json({ 
            data: projects,
            message: "Project Updated Successfully",
            success: true 
        });
    } catch (error) {
        console.error('Project update error', error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        
        if (!projects) {
            return res.status(404).json({ message: "No projects found" });
        }

        res.status(200).json({ 
            message: "Projects fetched successfully", 
            projects 
        });
    } catch (error) {
        console.error('Project fetching error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        
        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required", success: false });
        }
        
        const deletedProject = await Project.findByIdAndDelete(projectId);
        
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found", success: false });
        }
        
        res.status(200).json({ message: "Project successfully deleted", success: true });
    } catch (error) {
        console.error('Project deletion error:', error);
        res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};