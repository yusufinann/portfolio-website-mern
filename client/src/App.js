import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/ProtectedRoute'; 
import LoginPage from './pages/LoginPage';
import { PortfolioProvider } from './context/PortfolioContext ';
import Admin from './pages/Admin/Index';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/admin" element={<ProtectedRoute />}>
            <Route index element={<Admin />} />
          </Route>

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;