import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from './Loader'; // Basit bir yükleme göstergesi (projenizde varsa)
import { usePortfolio } from '../context/PortfolioContext ';

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = usePortfolio();

  // 1. Kimlik doğrulama durumu yükleniyorsa, bir yükleme göstergesi göster
  // Bu, sayfa ilk yüklendiğinde checkAuth isteği tamamlanana kadar beklemek için önemlidir.
  if (authLoading) {
    // Projenizde genel bir Loader bileşeniniz varsa onu kullanın
    // Yoksa basit bir metin de gösterebilirsiniz:
    // return <div>Yükleniyor...</div>;
    return <Loader />;
  }

  // 2. Kimlik doğrulama durumu yüklendi VE kullanıcı giriş yapmışsa
  // İstenen rotanın içeriğini (Outlet aracılığıyla) göster
  if (isAuthenticated) {
    return <Outlet />; // <Outlet />, App.js'deki <Route index element={<AdminIndex />} /> gibi iç içe geçmiş rotaları render eder.
  }

  // 3. Kimlik doğrulama durumu yüklendi AMA kullanıcı giriş yapmamışsa
  // Kullanıcıyı login sayfasına yönlendir.
  // 'replace' prop'u, tarayıcı geçmişinde login sayfasının üzerine yazarak
  // geri tuşuna basıldığında tekrar korunan sayfaya dönülmesini engeller.
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;