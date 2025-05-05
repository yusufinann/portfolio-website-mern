import { About } from "../models/portfolioModel.js";

export const about = async (req, res) => {
  try {
    const { lottieURL, description1, description2, skills } = req.body;
    // Verilerin doğrulanması
    if (!lottieURL || !description1 || !description2 || !skills) {
      return res.status(400).json({ message: "All fields obligatory" });
    }

    const newAbout = new About({
      lottieURL,
      description1,
      description2,
      skills,
    });
    await newAbout.save();

    res
      .status(201)
      .json({ message: "About created successfully", about: newAbout });
  } catch (error) {
    console.error("About created error:", error);
    res.status(500).json({ message: "server error" });
  }
};

export const updateabout = async (req, res) => {
  try {
    const { _id, lottieURL, description1, description2, skills } = req.body;
    if (
      !_id ||
      !lottieURL ||
      !description1 ||
      !description2 ||
      !skills 
    ) {
      return res
        .status(400)
        .json({ message: "Tüm alanlar gereklidir.", success: false });
    }
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    if (!about) {
      return res
        .status(404)
        .json({ message: "About not found.", success: false });
    }
    res.status(200).json({
      data: about,
      success: true,
      message: "About Updated Successfully!",
    });
  } catch (error) {
    console.error("Intro güncelleme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası", success: false });
  }
};
