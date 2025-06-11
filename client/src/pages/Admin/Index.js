import React, { useState } from "react";
import Header from "../../components/Header"; // Header bileşenini ekledik
import "./Tabs.css"; // Custom CSS dosyası
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { usePortfolio } from "../../context/PortfolioContext ";
import Loader from "../../components/Loader";
import AdminExperience from "./AdminExperience";
import AdminProject from "./AdminProject";
import AdminCourse from "./AdminCourse";
import AdminContact from "./AdminContact";

function Index() {
  const [activeTab, setActiveTab] = useState(1);
  const { portfolioData, loading, error } = usePortfolio();

  if (loading) {
    return <Loader/>; // Yüklenme göstergesi
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Hata mesajı
  }

  return (
    <div>
      <Header /> {/* Header bileşeni burada */}
      
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
          {activeTab === 1 && (
           <AdminIntro data={portfolioData?.intro}/>
          )}
          {activeTab === 2 && (
           <AdminAbout data={portfolioData?.about}/>
          )}
          {activeTab === 3 && (
           <AdminExperience experiences={portfolioData?.experiences}/>
          )}
          {activeTab === 4 && (
             <AdminProject data={portfolioData?.projects}/>
          )}
          {activeTab === 5 && (
            <AdminCourse data={portfolioData?.courses}/>
          )}
          {activeTab === 6 && (
            <AdminContact data={portfolioData?.contact}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
