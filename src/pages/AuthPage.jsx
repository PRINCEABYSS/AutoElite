import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Имитируем логин
      dispatch(login({ email: formData.email, password: formData.password }));
      navigate('/profile');
    } else {
      // Регистрация: сохраняем в список пользователей
      const newUser = { ...formData, id: Date.now(), role: 'user' };
      dispatch(register(newUser));
      alert("Аккаунт создан! Теперь войдите.");
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? "С возвращением!" : "Создать аккаунт"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" placeholder="Ваше имя" required 
              onChange={e => setFormData({...formData, name: e.target.value})} />
          )}
          <input type="email" placeholder="Email" required 
            onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Пароль" required 
            onChange={e => setFormData({...formData, password: e.target.value})} />
          
          <button type="submit" className="hero-btn">
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} style={{cursor: 'pointer', marginTop: '15px'}}>
          {isLogin ? "Нет аккаунта? Зарегистрируйтесь" : "Уже есть аккаунт? Войти"}
        </p>
      </div>
    </div>
  );
};

export default Auth;