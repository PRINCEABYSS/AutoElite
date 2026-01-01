import React from 'react';
import { useSelector } from 'react-redux';
import './Footer.css';

const Footer = () => {
  const lang = useSelector((state) => state.language.lang);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-col">
            <h3 className="footer-title">AutoElite</h3>
            
            <p className="footer-text special-effect">
              {lang === 'en' ? 'Your reliable partner in the world of premium cars since 2010.' : 
               lang === 'kg' ? '2010-жылдан бери премиум унаалар дүйнөсүндөгү ишенимдүү өнөктөшүңүз.' : 
               'Ваш надежный партнер в мире премиальных автомобилей с 2010 года.'}
            </p>
          </div>

          
          <div className="footer-col">
            <h4 className="footer-title">
              {lang === 'en' ? 'Contacts' : lang === 'kg' ? 'Байланыштар' : 'Контакты'}
            </h4>
            <ul className="contact-list">
              <li className="hover-link"><span className="icon">📞</span> +(996)552-236-611</li>
              <li className="hover-link"><span className="icon">✉️</span> info@autoelite.ru</li>
              <li className="hover-link"><span className="icon">📍</span> {
                lang === 'en' ? 'Bishkek, Tynalieva st, 92' : 
                lang === 'kg' ? 'Бишкек ш., Тыналиев көч., 92' : 
                'Бишкек, ул. Тыналиева, 92'
              }</li>
            </ul>
          </div>

          
          <div className="footer-col">
            <h4 className="footer-title">
              {lang === 'en' ? 'Working Hours' : lang === 'kg' ? 'Иштөө убактысы' : 'Часы работы'}
            </h4>
            <ul className="hours-list">
              <li className="hover-link"><span>{lang === 'en' ? 'Mon-Fri' : 'Пн-Пт'}:</span> 9:00 - 21:00</li>
              <li className="hover-link"><span>{lang === 'en' ? 'Sat-Sun' : 'Сб-Вс'}:</span> 10:00 - 20:00</li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="footer-bottom">
          <p>© 2025 AutoElite. {lang === 'en' ? 'All rights reserved.' : lang === 'kg' ? 'Бардык укуктар корголгон.' : 'Все права защищены.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;