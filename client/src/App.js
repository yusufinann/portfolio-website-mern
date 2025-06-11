import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/ProtectedRoute'; // Admin sayfasını korumak için (bir önceki adımda oluşturmuştuk)
import LoginPage from './pages/LoginPage';
import { PortfolioProvider } from './context/PortfolioContext ';
import Admin from './pages/Admin/Index';
// import Loader from './components/Loader'; // Eğer PortfolioProvider içinde global yükleme varsa

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin rotasını ProtectedRoute ile sarmala */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route index element={<Admin />} />
            {/* Admin paneli içinde başka alt rotalarınız olursa:
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
            */}
          </Route>

          {/* İsteğe bağlı: 404 Sayfası */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;