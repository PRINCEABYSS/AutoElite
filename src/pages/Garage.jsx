import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeFromGarage } from '../features/garage/garageSlice'; 


const translations = {
  ru: {
    garage: "Мой Гараж",
    emptyGarage: "Ваш гараж пока пуст",
    removeFromGarage: "Удалить",
    price: "Цена:"
  },
  en: {
    garage: "My Garage",
    emptyGarage: "Your garage is empty",
    removeFromGarage: "Remove",
    price: "Price:"
  }
};

const Garage = () => {
  const dispatch = useDispatch();
  
  const cars = useSelector((state) => state.garage.cars);
  
  const lang = useSelector((state) => state.language?.lang || 'ru');
  const t = translations[lang];

  if (!cars || cars.length === 0) {
    return (
      <div className="page-content" style={emptyStateStyle}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{t.emptyGarage}</h2>
        <p style={{ fontSize: '5rem' }}>🏁</p>
        <button 
          onClick={() => window.history.back()} 
          style={backBtnStyle}
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="page-content" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={titleStyle}>{t.garage}</h2>
      
      <div style={gridStyle}>
        {cars.map((car) => (
          <div key={car.id} className="car-card-garage" style={cardStyle}>
          
            <div
              style={{
                height: '200px',
                backgroundImage: `url(${car.images && car.images[0] ? car.images[0] : car.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '15px 15px 0 0'
              }}
            />
            
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>
                {car.brand} {car.model}
              </h3>
              <p style={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '20px' }}>
                ${Number(car.price).toLocaleString()}
              </p>
              
              <button
                className="btn-remove"
                onClick={() => dispatch(removeFromGarage(car.id))}
                style={removeBtnStyle}
              >
                {t.removeFromGarage}
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .car-card-garage {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: white;
          border: 1px solid #eee;
        }
        .car-card-garage:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        .btn-remove:hover {
          background: #ff4d4d !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

const emptyStateStyle = {
  textAlign: 'center',
  padding: '150px 20px',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

const titleStyle = {
  fontSize: '3rem',
  fontWeight: '900',
  marginBottom: '50px',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '2px'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '30px'
};

const cardStyle = {
  borderRadius: '20px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

const removeBtnStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  border: '1px solid #ff4d4d',
  background: 'transparent',
  color: '#ff4d4d',
  fontWeight: '700',
  cursor: 'pointer',
  transition: '0.3s'
};

const backBtnStyle = {
  marginTop: '30px',
  padding: '12px 25px',
  borderRadius: '10px',
  border: 'none',
  background: '#ff6b35',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Garage;