import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    dispatch(login());
    navigate('/admin/dashboard');
  };

  return (
    <div className="admin-login-page">
    
      <div className="login-glass-box">
        <div className="scanner-line"></div>
        
        <form onSubmit={handleAuth} className="login-form">
          <div className="auth-header">
            <span className="system-status">SYSTEM ACCESS</span>
            <h2>ВХОД В ПАНЕЛЬ</h2>
          </div>

          <div className="interface-decoration">
            <div className="bracket left">[</div>
            <div className="id-badge">ID: ADMIN_001</div>
            <div className="bracket right">]</div>
          </div>

          <button type="submit" className="login-btn">
            <span className="btn-text">ИНИЦИИРОВАТЬ ВХОД</span>
            <div className="btn-glitch"></div>
          </button>
          
          <p className="security-notice">SECURITY LEVEL: HIGH</p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;