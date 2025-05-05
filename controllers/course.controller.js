import { Course } from "../models/portfolioModel.js";

export const courses = async (req, res) => {
  try {
    const { title, image, description, link, technologies } = req.body;

    // Input validation
    // Input validation
    if (
      !title ||
      !image ||
      !description ||
      !link ||
      !Array.isArray(technologies) ||
      technologies.length === 0
    ) {
      return res.status(400).json({
        message:
          "All fields obligatory and technologies must be a non-empty array",
      });
    }

    // Create a new course instance
    const newCourse = new Course({
      title,
      image,
      description,
      link,
      technologies,
    });

    // Save the course to the database
    await newCourse.save();

    // Respond with the created course
    res
      .status(201)
      .json({ message: "Course created successfully", courses: newCourse });
  } catch (error) {
    console.error("Course creation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const updatecourse = async (req, res) => {
  try {
    const { title, image, description, link, technologies } = req.body;

    // Input validation
    if (
      !title ||
      !image ||
      !description ||
      !link ||
      !Array.isArray(technologies) ||
      technologies.length === 0
    ) {
      return res.status(400).json({
        message:
          "All fields obligatory and technologies must be a non-empty array",
      });
    }

    const courses = await Course.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    if (!courses) {
      return res
        .status(404)
        .json({ message: "Courses not found", success: false });
    }
    res
      .status(200)
      .json({
        data: courses,
        success: true,
        message: "Course updated successfully",
      });
  } catch (error) {
    console.error("Course error updating:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Input validation
    if (!id) {
      return res.status(400).json({
        message: "Course ID is required",
        success: false
      });
    }

    // Find and delete the course
    const deletedCourse = await Course.findByIdAndDelete(id);
    
    if (!deletedCourse) {
      return res.status(404).json({
        message: "Course not found",
        success: false
      });
    }

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    });
  } catch (error) {
    console.error("Course deletion error:", error);
    res.status(500).json({
      message: "Error deleting course",
      error: error.message,
      success: false
    });
  }
};