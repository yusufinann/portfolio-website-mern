import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const PortfolioContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_URL;
export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/portfolio/get-portfolio-data`);
      setPortfolioData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch portfolio data');
      setPortfolioData(null);
      console.error("Portfolio data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkLoggedIn = async () => {
    setAuthLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/auth/check-auth`, { withCredentials: true });
      if (data.isAuthenticated) {
        setUserInfo(data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserInfo(null);
      }
    } catch (err) {
      console.warn('Auth check error:', err.response?.data?.message || err.message);
      setIsAuthenticated(false);
      setUserInfo(null);
    }
    setAuthLoading(false);
  };

  const login = (userData) => {
    setUserInfo({ _id: userData._id, username: userData.username });
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      setUserInfo(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      await checkLoggedIn();
      await fetchPortfolioData();
    };
    initializeApp();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        loading,
        error,
        fetchPortfolioData,
        isAuthenticated,
        userInfo,
        authLoading,
        login,
        logout,
        checkLoggedIn,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);