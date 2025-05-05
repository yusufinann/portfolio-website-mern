import { Contact } from "../models/portfolioModel.js";

export const contact = async (req, res) => {
  try {
    const { name, age, gender, email, mobile, country } = req.body;

    if (!name || !age || !gender || !email || !mobile || !country) {
      return res
        .status(400)
        .json({
          message:
            "All fields are obligatory and technologies must be a non-empty array",
        });
    }

    const newContact = new Contact({
      name,
      age,
      gender,
      email,
      mobile,
      country,
    });
    await newContact.save();

    res
      .status(201)
      .json({ message: "Contact created successfully", contact: newContact });
  } catch (error) {
    console.error("Contact creation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const updatecontact = async (req, res) => {
  try {
    const { name, age, gender, email, mobile, country } = req.body;

    // Validate required fields
    if (!name || !age || !gender || !email || !mobile || !country) {
      return res.status(400).json({
        message:
          "All fields are obligatory and technologies must be a non-empty array",
      });
    }

    // Update the contact
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id }, // Find contact by _id
      req.body, // Update with the request body
      { new: true } // Return the updated document
    );

    // If contact is not found
    if (!contact) {
      return res.status(400).json({
        message: "Contact not found",
        success: false,
      });
    }

    // Success response
    res.status(200).json({
      data: contact,
      success: true,
      message: "Contact Updated Successfully!",
    });
  } catch (error) {
    // Catch and handle any errors
    console.error("Contact update Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
