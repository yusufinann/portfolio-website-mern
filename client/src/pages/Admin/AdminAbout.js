import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
const API_BASE_URL = process.env.REACT_APP_API_URL;
function AdminAbout({ data }) {
  const [formData, setFormData] = useState({
    lottieURL: "",
    description1: "",
    description2: "",
    skills: []
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (data) {
      setFormData({
        lottieURL: data.lottieURL || "",
        description1: data.description1 || "",
        description2: data.description2 || "",
        skills: Array.isArray(data.skills) ? data.skills : [],
      });
    }
  }, [data]);

  const [newSkill, setNewSkill] = useState({
    name: "",
    image: "",
    link: "",
  });

  const addSkill = (e) => {
    e.preventDefault();
    // Skill fields are now optional
    if (newSkill.name || newSkill.image || newSkill.link) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [
          ...prevFormData.skills,
          { ...newSkill},
        ],
      }));
      setNewSkill({ name: "", image: "", link: "" });
    }
  };

  const removeSkill = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: prevFormData.skills.filter((_, index) => index !== indexToRemove),
    }));
  };

  const updateSkill = (index, updatedSkill) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: prevFormData.skills.map((skill, i) => (i === index ? updatedSkill : skill)),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const updatedData = {
      _id: data._id,
      lottieURL: formData.lottieURL,
      description1: formData.description1,
      description2: formData.description2,
      skills: formData.skills,
    };

    try {
      const response = await axios.post(
      `${API_BASE_URL}/api/about/update-about`,
      updatedData
    );
      if (response.data.success) {
        setSuccessMessage("About başarıyla güncellendi!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('Güncelleme sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="form-container">
      <h2>Admin About</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Lottie URL */}
        <div className="form-group">
          <label htmlFor="lottieURL">Lottie URL</label>
          <input
            type="text"
            id="lottieURL"
            name="lottieURL"
            value={formData.lottieURL}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Lottie URL"
            required
          />
        </div>

        {/* Description 1 */}
        <div className="form-group">
          <label htmlFor="description1">Description 1</label>
          <textarea
            id="description1"
            name="description1"
            value={formData.description1}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Description 1"
            rows="4"
            required
          />
        </div>

        {/* Description 2 */}
        <div className="form-group">
          <label htmlFor="description2">Description 2</label>
          <textarea
            id="description2"
            name="description2"
            value={formData.description2}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Description 2"
            rows="4"
            required
          />
        </div>

        {/* Skill Ekleme */}
        <div className="form-group">
          <label>Yeni Skill Ekle</label>
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder="Skill Name"
            className="form-input"
          />
          <input
            type="text"
            value={newSkill.image}
            onChange={(e) => setNewSkill({ ...newSkill, image: e.target.value })}
            placeholder="Skill Image URL"
            className="form-input"
          />
          <input
            type="text"
            value={newSkill.link}
            onChange={(e) => setNewSkill({ ...newSkill, link: e.target.value })}
            placeholder="Skill Link"
            className="form-input"
          />
          <button onClick={addSkill} className="add-skill-button">Add Skill</button>
        </div>

        {/* Skills List */}
        <div className="skills-list">
          {formData.skills.map((skill, index) => (
            <div key={skill._id} className="skill-item">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, { ...skill, name: e.target.value })}
                className="form-input"
                placeholder="Skill Name"
              />
              <input
                type="text"
                value={skill.image}
                onChange={(e) => updateSkill(index, { ...skill, image: e.target.value })}
                className="form-input"
                placeholder="Skill Image URL"
              />
              <input
                type="text"
                value={skill.link}
                onChange={(e) => updateSkill(index, { ...skill, link: e.target.value })}
                className="form-input"
                placeholder="Skill Link"
              />
              <button type="button" onClick={() => removeSkill(index)} className="remove-skill-button">Remove</button>
            </div>
          ))}
        </div>

        {/* Submit */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {/* Success Message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default AdminAbout;
