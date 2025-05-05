import { Experience } from "../models/portfolioModel.js";

export const experience = async (req, res) => {
  try {
    const { title, period, company, description } = req.body;
    
    if (!title || !period || !company || !description) {
      return res.status(400).json({ message: "All fields obligatory" });
    }
    
    const newExperience = new Experience({
      title,
      period,
      company,
      description,
    });

    await newExperience.save();
    res.status(201).json({ message: "experience created successfully", experience: newExperience });
  } catch (error) {
    console.error('Experience creation error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({});
    
    if (!experiences) {
      return res.status(404).json({ message: "No experiences found" });
    }

    res.status(200).json({ message: "Experiences fetched successfully", experiences });
  } catch (error) {
    console.error('Experience fetching error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateexperience = async (req, res) => {
  try {
    const { title, period, company, description } = req.body;
    
    if (!title || !period || !company || !description) {
      return res.status(400).json({ message: "All fields obligatory" });
    }
    
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    
    if (!experience) {
      return res.status(404).json({ message: "Experience Not Found.", success: false });
    }
    
    res.status(200).json({ data: experience, success: true, message: "Experience başarıyla güncellendi!" });
  } catch (error) {
    console.error('Experience güncelleme hatası:', error);
    res.status(500).json({ message: "Sunucu hatası", success: false });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const experienceId = req.params.id;
    
    if (!experienceId) {
      return res.status(400).json({ message: "Experience ID is required", success: false });
    }
    
    const deletedExperience = await Experience.findByIdAndDelete(experienceId);
    
    if (!deletedExperience) {
      return res.status(404).json({ message: "Experience not found", success: false });
    }
    
    res.status(200).json({ message: "Experience successfully deleted", success: true });
  } catch (error) {
    console.error('Experience silme hatası:', error);
    res.status(500).json({ message: "Server error", success: false, error: error.message });
  }
};