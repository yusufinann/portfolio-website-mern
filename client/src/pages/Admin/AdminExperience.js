import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';

const API_BASE_URL = process.env.REACT_APP_API_URL;
function AdminExperience({ experiences }) {
  const [formData, setFormData] = useState({
    title: '',
    period: '',
    company: '',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('edit'); // 'add' or 'edit'

  useEffect(() => {
    if (selectedExperience) {
      setFormData({
        title: selectedExperience.title || '',
        period: selectedExperience.period || '',
        company: selectedExperience.company || '',
        description: selectedExperience.description || ''
      });
    }
  }, [selectedExperience]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      period: '',
      company: '',
      description: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);

    try {
      let response;
      
      if (modalMode === 'edit') {
        const updatedData = {
          _id: selectedExperience._id,
          ...formData
        };
        response = await axios.post(`${API_BASE_URL}/api/experience/update-experience`, updatedData);
        if (response.data.success) {
          setSuccessMessage("Experience başarıyla güncellendi!");
        }
      } else {
        // Add new experience
        response = await axios.post(`${API_BASE_URL}/api/experience`, formData);
        if (response.data) {
          setSuccessMessage("Experience başarıyla eklendi!");
        }
      }
      
      setTimeout(() => setSuccessMessage(''), 3000);
      resetForm();
    } catch (error) {
      setErrorMessage(modalMode === 'edit' ? 
        'Güncelleme sırasında bir hata oluştu.' : 
        'Ekleme sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleSelectExperience = (experience) => {
    setSelectedExperience(experience);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    resetForm();
    setSelectedExperience(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/experience/${id}`);
      setSuccessMessage("Experience başarıyla silindi!");
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage("Silme işlemi sırasında hata oluştu.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="form-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Experience</h2>
        <button 
          onClick={handleAddNew}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out"
        >
          Add New Experience
        </button>
      </div>

      {successMessage && <div className="success-alert bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{successMessage}</div>}
      {errorMessage && <div className="error-alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errorMessage}</div>}

      {/* Experience Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div key={exp._id} className="experience-card border rounded-lg shadow-md p-4 flex flex-col justify-between min-h-[200px] relative">
            <div>
              <h4 className="text-lg font-semibold">{exp.title}</h4>
              <p>{exp.company}</p>
              <p>{exp.period}</p>
              <p>{exp.description}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => handleSelectExperience(exp)} 
                className="bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(exp._id)} 
                className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition duration-200 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding/Editing Experience */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === 'edit' ? 'Edit Experience' : 'Add New Experience'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="period">Period</label>
                <input
                  type="text"
                  id="period"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 p-2 rounded"
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                  {modalMode === 'edit' ? 'Save Changes' : 'Add Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminExperience;