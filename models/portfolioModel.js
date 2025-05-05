import mongoose from "mongoose";

// Intro Schema
const introSchema = new mongoose.Schema({
    welcomeText: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

// About Schema
const aboutSchema = new mongoose.Schema({
    lottieURL: {
        type: String,
        required: true,
    },
    description1: {
        type: String,
        required: true,
    },
    description2: {
        type: String,
        required: true,
    },
    skills: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true },
            link: { type: String, required: true }
        }
    ],
});

// Experience Schema
const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

// Projects Schema
const projectsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    technologies: {
        type: [String],
        required: true,
    },
});

// Courses Schema
const coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    technologies: {
        type: [String], // Change this to an array of strings
        required: true,
    },
});


// Contact Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/ // Basic email validation
    },
    mobile: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

// Exporting models
export const Intro = mongoose.model("Intro", introSchema);
export const About = mongoose.model("About", aboutSchema);
export const Experience = mongoose.model("Experience", experienceSchema);
export const Project = mongoose.model("Projects", projectsSchema);
export const Course = mongoose.model("Courses", coursesSchema);
export const Contact = mongoose.model("Contact", contactSchema);
