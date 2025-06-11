import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; 
import { usePortfolio } from '../../context/PortfolioContext ';
import Loader from '../../components/Loader';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, authLoading } = usePortfolio();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/admin'); // Eğer zaten giriş yapılmışsa ve auth kontrolü bittiyse admin'e yönlendir
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Cookie tabanlı auth için çok önemli!
      };
      const { data } = await axios.post(
        'http://localhost:8000/api/auth/login',
        { username, password },
        config
      );

      login(data); // Context'teki login fonksiyonunu çağır (kullanıcı bilgisini ve auth durumunu günceller)
      navigate('/admin'); // Başarılı giriş sonrası admin paneline yönlendir
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.'
      );
      console.error('Login error:', err);
    }
    setLoading(false);
  };

  if (authLoading) {
    return <Loader />; // Auth durumu kontrol edilirken yükleme ekranı
  }
  
  // Eğer hala giriş yapmış durumdaysa (useEffect'ten sonra bir render döngüsü daha olursa diye)
  if (isAuthenticated) {
     navigate('/admin'); // Güvenlik için tekrar yönlendirme
     return null; // Veya bir yükleme göstergesi
  }

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <div className="login-header">
          <h2>Admin Paneli Girişi</h2>
          <p>Lütfen devam etmek için giriş yapın.</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adınızı girin"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        {/* Opsiyonel: Şifremi unuttum veya kayıt ol linkleri eklenebilir */}
        {/* <div className="login-footer">
          <a href="/forgot-password">Şifremi Unuttum?</a>
        </div> */}
      </div>
    </div>
  );
}

export default LoginPage;