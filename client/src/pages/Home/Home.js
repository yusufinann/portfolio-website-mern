import React from "react";
import Intro from "./Intro";
import Header from "../../components/Header";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Courses from "./Courses";
import Contact from "./Contact";
import Footer from "./Footer";
import LeftSider from "./LeftSider";
import { usePortfolio } from "../../context/PortfolioContext ";
import Loader from '../../components/Loader'

function Home() {

  const { portfolioData, loading, error } = usePortfolio(); // Context'teki verileri alıyoruz

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="bg-primary lg:px-20 sm:px-5">
        <Intro data={portfolioData.intro}/>
        <About data={portfolioData.about}/>
        <Experiences data={portfolioData.experiences}/>
        <Projects data={portfolioData.projects}/>
        <Courses data={portfolioData.courses}/>
        <Contact data={portfolioData.contact}/>
        <Footer/>
        <LeftSider/>
      </div>
    </div>
  );
}

export default Home;
