import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';

const API_BASE_URL = process.env.REACT_APP_API_URL;
function AdminContact({data}) {
  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', email: '', mobile: '', country: ''
  });
console.log()
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
console.log(data)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    if (data) {
      setFormData({
        _id:data._id || "",
        name: data.name || "",
        age: data.age || "",
        gender: data.gender || "",
        email:data.email||"",
        mobile:data.mobile||"", 
        country:data.country||"",
      });
    }
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact/update-contact`, formData);
      if (response.data.success) {
        setSuccessMessage('Contact updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      } else {
        setErrorMessage('Failed to update the contact.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating the contact.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='form-container'>
      <h2>Admin Contact</h2>

      {successMessage && <div className="success-alert">{successMessage}</div>}
      {errorMessage && <div className="error-alert">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Age"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Gender"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Mobile Number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Country"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminContact;
