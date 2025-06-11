import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from './Loader'; // Basit bir yükleme göstergesi (projenizde varsa)
import { usePortfolio } from '../context/PortfolioContext ';

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = usePortfolio();

  if (authLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Outlet />; 
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;