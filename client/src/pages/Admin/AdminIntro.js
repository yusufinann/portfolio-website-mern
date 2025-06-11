import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios'u import ediyoruz
import "./adminintro.css"; // CSS dosyasını import ediyoruz
import Loader from "../../components/Loader";

function AdminIntro({ data }) {
  const [formData, setFormData] = useState({
    welcomeText: "", // welcomeText alanı eklendi
    firstname: "",
    lastname: "",
    description: "",
    caption: ""
  });
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const [successMessage, setSuccessMessage] = useState(""); // Başarı mesajı

  // Gelen veriyi formun varsayılan değerleri olarak ayarlıyoruz
  useEffect(() => {
    if (data) {
      setFormData({
        welcomeText: data.welcomeText || "", // welcomeText'i ekliyoruz
        firstname: data.firstName || "",
        lastname: data.lastName || "",
        description: data.description || "",
        caption: data.caption || ""
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
   
  //Güncelleme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Yüklenme durumunu başlat
    setSuccessMessage(""); // Önceki mesajı sıfırla

    // Güncelleme isteği için veri hazırlama
    const updatedData = {
      _id: data._id, // Belge kimliğini ekliyoruz
      welcomeText: formData.welcomeText, // welcomeText güncelleniyor
      firstName: formData.firstname,
      lastName: formData.lastname,
      description: formData.description,
      caption: formData.caption
    };

    try {
      // Axios ile POST isteği atma
      const response = await axios.post('http://localhost:8000/api/intro/update-intro', updatedData);
      console.log(response.data); // Başarılı yanıtı konsola yazdırıyoruz

      if (response.data.success) {
        setSuccessMessage("Intro başarıyla güncellendi!"); // Başarı mesajını ayarla

        // Mesajı 3 saniye sonra temizle
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }

    } catch (error) {
      console.error('Güncelleme hatası:', error);
      // Hata durumunda kullanıcıya bildirim yapabilirsiniz
      alert('Güncelleme sırasında bir hata oluştu.');
    }finally{
        setLoading(false); // Yüklenme durumunu sonlandır
    }
  };
  
  if(loading){
    return <Loader/>
  }
  return (
    <div className="form-container">
      <h2>Admin Intro</h2>
      {successMessage && <div className="success-alert">{successMessage}</div>} 
      <form onSubmit={handleSubmit} className="form">
        
        {/* Welcome Text */}
        <div className="form-group">
          <label htmlFor="welcomeText">Welcome Text</label>
          <input
            type="text"
            id="welcomeText"
            name="welcomeText"
            value={formData.welcomeText}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Welcome Text"
            required
          />
        </div>

        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter First Name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Last Name"
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
            rows="4"
            required
          />
        </div>

        {/* Caption */}
        <div className="form-group">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            id="caption"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Caption"
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
        Submit
        </button>
      </form>
    </div>
  );
}

export default AdminIntro;
