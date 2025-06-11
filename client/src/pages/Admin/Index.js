import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../../components/Header";
import "./Tabs.css";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import Loader from "../../components/Loader";
import AdminExperience from "./AdminExperience";
import AdminProject from "./AdminProject";
import AdminCourse from "./AdminCourse";
import AdminContact from "./AdminContact";
import { usePortfolio } from "../../context/PortfolioContext ";

function Admin() {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate(); 
  const {
    portfolioData,
    loading: portfolioLoading, 
    error,
    logout,
    userInfo,
  } = usePortfolio();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); 
  };

  if (portfolioLoading && !portfolioData) {
    return <Loader />;
  }

  
  if (error) {
    return <div>Error loading portfolio data: {error.message || JSON.stringify(error)}</div>;
  }

  if (!portfolioData) {
    return <Loader />; 
  }

  return (
    <div>
      <Header />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          background: '#f0f0f0',
          borderBottom: '1px solid #ddd',
        }}
      >
        <span>
          Hoşgeldiniz, <strong>{userInfo?.username || 'Admin'}</strong>!
        </span>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 15px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Çıkış Yap
        </button>
      </div>

      <div className="container">
        {/* Tab Headers */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 1 ? "active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Intro
          </button>
          <button
            className={`tab ${activeTab === 2 ? "active" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            About
          </button>
          <button
            className={`tab ${activeTab === 3 ? "active" : ""}`}
            onClick={() => setActiveTab(3)}
          >
            Experiences
          </button>
          <button
            className={`tab ${activeTab === 4 ? "active" : ""}`}
            onClick={() => setActiveTab(4)}
          >
            Projects
          </button>
          <button
            className={`tab ${activeTab === 5 ? "active" : ""}`}
            onClick={() => setActiveTab(5)}
          >
            Courses
          </button>
          <button
            className={`tab ${activeTab === 6 ? "active" : ""}`}
            onClick={() => setActiveTab(6)}
          >
            Contact
          </button>
        </div>

        {/* Tab Contents */}
        <div className="tab-content">
          {activeTab === 1 && <AdminIntro data={portfolioData.intro} />}
          {activeTab === 2 && <AdminAbout data={portfolioData.about} />}
          {activeTab === 3 && <AdminExperience experiences={portfolioData.experiences} />}
          {activeTab === 4 && <AdminProject data={portfolioData.projects} />}
          {activeTab === 5 && <AdminCourse data={portfolioData.courses} />}
          {activeTab === 6 && <AdminContact data={portfolioData.contact} />}
        </div>
      </div>
    </div>
  );
}

export default Admin;