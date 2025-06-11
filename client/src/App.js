import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { PortfolioProvider } from './context/PortfolioContext ' // Context dosyasını import ediyoruz
import Index from './pages/Admin/Index';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Index />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
