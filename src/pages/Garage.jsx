import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { removeFromGarage } from '../features/garage/garageSlice'; // Убедись, что путь верный
import bgfon from '../assets/задний фон.jpg';
import './Garage.css';

const translations = {
  ru: {
    garage: "Мой Гараж",
    emptyGarage: "Ваш гараж пока пуст",
    backToCatalog: "Вернуться в каталог",
    totalValue: "Сумма заказа:",
    checkout: "Оформить заказ",
    remove: "Удалить",
    details: "Инфо",
    confirmDelete: "Удалить из заказа?",
    searchPlaceholder: "Поиск в коллекции...",
    count: "Автомобилей:",
    noResults: "Ничего не найдено",
    formTitle: "Оформление покупки",
    name: "Ваше имя",
    phone: "Номер телефона",
    city: "Город доставки",
    orderBtn: "Подтвердить покупку",
    successTitle: "Заказ оформлен!",
    successText: "Наш менеджер свяжется с вами в ближайшее время.",
    back: "Вернуться"
  },
  en: {
    garage: "My Garage",
    emptyGarage: "Garage is empty",
    backToCatalog: "Back to Catalog",
    totalValue: "Total Amount:",
    checkout: "Proceed to Checkout",
    remove: "Remove",
    details: "Details",
    confirmDelete: "Remove from order?",
    searchPlaceholder: "Search cars...",
    count: "Cars total:",
    noResults: "No results",
    formTitle: "Checkout Process",
    name: "Full Name",
    phone: "Phone Number",
    city: "Delivery City",
    orderBtn: "Confirm Order",
    successTitle: "Success!",
    successText: "Our manager will contact you shortly.",
    back: "Back"
  }
};

const Garage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cars = useSelector((state) => state.garage.cars);
  const lang = useSelector((state) => state.language?.lang || 'ru');
  const t = translations[lang] || translations.ru;

  const [searchTerm, setSearchTerm] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderStep, setOrderStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', city: 'Bishkek' });

  const totalCost = useMemo(() => cars.reduce((sum, car) => sum + Number(car.price), 0), [cars]);

  const filteredCars = useMemo(() => {
    return cars.filter(car => 
      `${car.brand} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cars, searchTerm]);

  const handleOrder = (e) => {
    e.preventDefault();
    console.log("SENDING ORDER:", { customer: formData, items: cars, total: totalCost });
    setOrderStep(2);
  };

  const handleCloseSuccess = () => {
    setIsCheckoutOpen(false);
    setOrderStep(1);
  };

  if (cars.length === 0 && orderStep !== 2) {
    return (
      <div className="garage-page-container empty" style={{ '--bg-image': `url(${bgfon})` }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="empty-content-card">
          <div className="empty-icon">🏎️</div>
          <h2>{t.emptyGarage}</h2>
          <button onClick={() => navigate('/catalog')} className="btn-main-action">{t.backToCatalog}</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="garage-page-container" style={{ '--bg-image': `url(${bgfon})` }}>
      <div className="container">
        <header className="garage-header">
          <div className="header-info">
            <h2 className="page-title">{t.garage}</h2>
            <div className="header-chips">
              <span className="chip">{t.count} <strong>{cars.length}</strong></span>
            </div>
          </div>
          
          <div className="garage-stats-card">
            <span>{t.totalValue}</span>
            <div className="total-amount">${totalCost.toLocaleString()}</div>
            <button className="btn-checkout-trigger" onClick={() => setIsCheckoutOpen(true)}>
              {t.checkout}
            </button>
          </div>
        </header>

        <div className="garage-controls">
          <div className="search-box">
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="garage-search-input"
            />
          </div>
        </div>

        <motion.div layout className="garage-grid">
          <AnimatePresence mode='popLayout'>
            {filteredCars.map((car) => (
              <motion.div 
                layout
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="garage-item-card"
              >
                <div className="garage-item-image" style={{ backgroundImage: `url(${car.images?.[0] || car.image})` }}>
                  <div className="image-overlay-price">${Number(car.price).toLocaleString()}</div>
                </div>
                <div className="garage-item-info">
                  <div className="brand-label">{car.brand}</div>
                  <h3>{car.model}</h3>
                  <div className="garage-card-actions">
                    <button className="btn-view-details" onClick={() => navigate(`/catalog/${car.id}`)}>{t.details}</button>
                    <button className="btn-remove-garage" onClick={() => window.confirm(t.confirmDelete) && dispatch(removeFromGarage(car.id))}>{t.remove}</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {isCheckoutOpen && (
            <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
              <motion.div 
                initial={{ opacity: 0, y: 100 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 100 }}
                className="checkout-modal" 
                onClick={e => e.stopPropagation()}
              >
                <button className="close-btn" onClick={() => setIsCheckoutOpen(false)}>✕</button>
                
                {orderStep === 1 ? (
                  <form className="order-form" onSubmit={handleOrder}>
                    <h3>{t.formTitle}</h3>
                    <div className="order-summary-mini">
                      {t.count} <strong>{cars.length}</strong> | Total: <strong>${totalCost.toLocaleString()}</strong>
                    </div>
                    
                    <div className="input-group">
                      <label>{t.name}</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe" 
                      />
                    </div>

                    <div className="input-group">
                      <label>{t.phone}</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="+996 --- -- -- --" 
                      />
                    </div>

                    <div className="input-group">
                      <label>{t.city}</label>
                      <select value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
                        <option value="Bishkek">Bishkek</option>
                        <option value="Osh">Osh</option>
                        <option value="Almaty">Almaty</option>
                      </select>
                    </div>

                    <button type="submit" className="btn-confirm-order">{t.orderBtn}</button>
                  </form>
                ) : (
                  <div className="success-state">
                    <div className="success-icon">🎉</div>
                    <h2>{t.successTitle}</h2>
                    <p>{t.successText}</p>
                    <button className="btn-confirm-order" onClick={handleCloseSuccess}>
                      {t.back}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Garage;