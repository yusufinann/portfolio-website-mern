import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';

function AdminCourse({ data }) {
  const initialFormState = {
    title: '',
    description: '',
    link: '',
    image: '',
    technologies: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mode, setMode] = useState('add'); // 'add' or 'edit' mode
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    if (selectedCourse) {
      setFormData({
        title: selectedCourse.title || '',
        link: selectedCourse.link || '',
        image: selectedCourse.image || '',
        description: selectedCourse.description || '',
        technologies: selectedCourse.technologies || []
      });
      setMode('edit');
    }
  }, [selectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "technologies") {
      setFormData({
        ...formData,
        [name]: value.split(",").map(tech => tech.trim())
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedCourse(null);
    setMode('add');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);

    try {
      let response;
      
      if (mode === 'edit') {
        const updatedData = {
          _id: selectedCourse._id,
          ...formData
        };
        response = await axios.post('http://localhost:8000/api/course/update-course', updatedData);
        if (response.data.success) {
          setSuccessMessage("Course Updated Successfully!");
        }
      } else {
        // Add new course
        response = await axios.post('http://localhost:8000/api/course', formData);
        if (response.data) {
          setSuccessMessage("New Course Added Successfully!");
          // Reset form after adding
          resetForm();
        }
      }

      // Refresh the page after 2 seconds to show updated data
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Operation failed:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleAddNewClick = () => {
    resetForm();
  };
  
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setShowDeleteConfirm(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;
    
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:8000/api/course/${courseToDelete._id}`);
      
      if (response.data.success) {
        setSuccessMessage("Course deleted successfully!");
        setShowDeleteConfirm(false);
        setCourseToDelete(null);
        
        // If the deleted course was selected for editing, reset the form
        if (selectedCourse && selectedCourse._id === courseToDelete._id) {
          resetForm();
        }
        
        // Refresh the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setErrorMessage(error.response?.data?.message || 'Error deleting course');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setCourseToDelete(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="form-container">
      <h2>Admin Courses</h2>

      {successMessage && <div className="success-alert">{successMessage}</div>}
      {errorMessage && <div className="error-alert">{errorMessage}</div>}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete the course "{courseToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1><b>Course Management</b></h1>
        <button
          onClick={handleAddNewClick}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out"
        >
          Add New Course
        </button>
      </div>

      {/* Course List */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Course List</h2>
        {data && data.length > 0 ? (
          data.map((course) => (
            <div key={course._id} className="experience-item flex justify-between items-center p-3 border-b">
              <h4>{course.title}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSelectCourse(course)}
                  className="bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(course)}
                  className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition duration-200 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>

      {/* Form for Adding/Editing Course */}
      <form onSubmit={handleSubmit} className="form bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          {mode === 'edit' ? 'Edit Course' : 'Add New Course'}
        </h2>
        
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Title"
            required
          />
        </div>

        {/* Image */}
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Image URL"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Description"
            rows="3"
            required
          />
        </div>

        {/* Link */}
        <div className="form-group">
          <label htmlFor="link">Course Link</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Course Link"
            required
          />
        </div>

        {/* Technologies */}
        <div className="form-group">
          <label htmlFor="technologies">Technologies</label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Technologies (comma separated)"
            required
          />
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            className={`px-4 py-2 font-semibold rounded text-white ${
              mode === 'edit' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {mode === 'edit' ? 'Update Course' : 'Add Course'}
          </button>
          
          {mode === 'edit' && (
            <button 
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdminCourse;