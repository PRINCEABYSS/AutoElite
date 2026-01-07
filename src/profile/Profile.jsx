import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector(state => state.auth?.user || null);
  const garageCars = useSelector(state => state.garage.cars);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return <div className="page-content">Пожалуйста, войдите в систему</div>;
  }

  return (
    <div className="page-content">
      <div className="profile-wrapper">
        <aside className="profile-sidebar">
          <div className="user-avatar">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => { dispatch(logout()); navigate('/'); }} className="btn-logout">
            Выйти
          </button>
        </aside>

        <main className="profile-main">
          <div className="stats-grid">
            <div className="stat-box">
              <h4>Машин в гараже</h4>
              <p className="stat-number">{garageCars.length}</p>
            </div>
            <div className="stat-box">
              <h4>Статус аккаунта</h4>
              <p className="stat-text">{user.role === 'admin' ? 'Администратор' : 'Клиент'}</p>
            </div>
          </div>
          
          <button onClick={() => navigate('/garage')} className="btn-to-garage">
            Перейти в мой гараж →
          </button>
        </main>
      </div>
    </div>
  );
};

export default Profile;