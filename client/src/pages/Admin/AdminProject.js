import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';


const API_BASE_URL = process.env.REACT_APP_API_URL;
function AdminProject({ data }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    image: '',
    technologies: []
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('edit'); // 'add' or 'edit'
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projects, setProjects] = useState(data || []);

  useEffect(() => {
    if (selectedProject) {
      setFormData({
        title: selectedProject.title || '',
        link: selectedProject.link || '',
        image: selectedProject.image || '',
        description: selectedProject.description || '',
        technologies: Array.isArray(selectedProject.technologies) 
          ? selectedProject.technologies 
          : String(selectedProject.technologies).split(',').map(tech => tech.trim())
      });
    }
  }, [selectedProject]);

  useEffect(() => {
    setProjects(data);
  }, [data]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      link: '',
      image: '',
      technologies: []
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'technologies') {
      // Handle technologies as an array
      const techArray = value.split(',').map(tech => tech.trim()).filter(tech => tech !== '');
      setFormData({
        ...formData,
        technologies: techArray
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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
          _id: selectedProject._id,
          ...formData
        };
        response = await axios.post(`${API_BASE_URL}/api/project/update-project`, updatedData);
        
        if (response.data.success) {
          setSuccessMessage("Project başarıyla güncellendi!");
          // Update the local projects state with the updated project
          setProjects(prevProjects => 
            prevProjects.map(p => p._id === selectedProject._id ? {...p, ...formData} : p)
          );
        } else {
          setErrorMessage('Güncelleme başarısız oldu.');
        }
      } else {
        // Add new project
        response = await axios.post(`${API_BASE_URL}/api/project`, formData);
        
        if (response.data) {
          setSuccessMessage("Project başarıyla eklendi!");
          // Add the new project to the local state
          setProjects(prevProjects => [...prevProjects, response.data.project]);
        } else {
          setErrorMessage('Ekleme başarısız oldu.');
        }
      }
      
      setTimeout(() => setSuccessMessage(''), 3000);
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error(modalMode === 'edit' ? 'Güncelleme hatası:' : 'Ekleme hatası:', error);
      setErrorMessage(modalMode === 'edit' ? 
        'Güncelleme sırasında bir hata oluştu.' : 
        'Ekleme sırasında bir hata oluştu.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    resetForm();
    setSelectedProject(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    
    setLoading(true);
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/project/${projectToDelete._id}`);
      
      if (response.data.success) {
        setSuccessMessage("Project başarıyla silindi!");
        // Remove the deleted project from the local state
        setProjects(prevProjects => prevProjects.filter(p => p._id !== projectToDelete._id));
      } else {
        setErrorMessage('Silme işlemi başarısız oldu.');
      }
    } catch (error) {
      console.error('Silme hatası:', error);
      setErrorMessage('Silme sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="form-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Project</h2>
        <button 
          onClick={handleAddNew}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out"
        >
          Add New Project
        </button>
      </div>

      {successMessage && <div className="success-alert bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{successMessage}</div>}
      {errorMessage && <div className="error-alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errorMessage}</div>}

      {/* Project List */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Project List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="border rounded-lg shadow-md p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                <p className="text-sm text-gray-600 mb-2 truncate">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {Array.isArray(project.technologies) ? 
                    project.technologies.map((tech, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    )) : 
                    String(project.technologies).split(',').map((tech, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {tech.trim()}
                      </span>
                    ))
                  }
                </div>
              </div>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleSelectProject(project)}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(project)}
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding/Editing Project */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === 'edit' ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="form-group mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter Title"
                  required
                />
              </div>

              {/* Image */}
              <div className="form-group mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter Image URL"
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter Description"
                  rows="3"
                  required
                />
              </div>

              {/* Link */}
              <div className="form-group mb-4">
                <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter Project Link"
                  required
                />
              </div>

              {/* Technologies */}
              <div className="form-group mb-4">
                <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies}
                  onChange={handleChange}
                  className="form-input w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter Technologies (comma separated)"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter technologies separated by commas (e.g., React, Node.js, MongoDB)</p>
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
                  {modalMode === 'edit' ? 'Save Changes' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete the project "{projectToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProject;