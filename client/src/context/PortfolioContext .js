import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Context oluşturuyoruz
const PortfolioContext = createContext();

// Context Provider bileşeni oluşturuyoruz
export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API'den verileri çekiyoruz
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get('/api/portfolio/get-portfolio-data');
        setPortfolioData(response.data);
      } catch (error) {
        setError('Failed to fetch portfolio data');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolioData, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

// useContext Hook kullanarak Context'e erişim sağlamak için bir kısayol oluşturuyoruz
export const usePortfolio = () => React.useContext(PortfolioContext);
