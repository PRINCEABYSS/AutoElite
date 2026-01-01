import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLanguage } from '../../features/language/languageSlice';
import { translations } from '../../i18n/translations';
import './Header.css';

const Header = () => {
  const garageCars = useSelector(state => state.garage.cars);
  const dispatch = useDispatch();
  const lang = useSelector(state => state.language.lang);
  const t = translations[lang];

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <header className={`header ${!isVisible ? 'header-hidden' : ''}`}>
      <div className='container header-content'>
        <Link to='/' className='logo'>
          Auto<span>Elite</span>
        </Link>

        <nav>
          <ul>
            <li><Link to='/'>{t.home}</Link></li>
            <li><Link to='/catalog'>{t.catalog}</Link></li>
            <li><Link to='/about'>{t.about}</Link></li>
            <li><Link to='/contact'>{t.contacts}</Link></li>
          </ul>
        </nav>

        <div className='lang-switch'>
          {['ru', 'kg', 'en'].map(l => (
            <button 
              key={l}
              className={lang === l ? 'active' : ''} 
              onClick={() => dispatch(setLanguage(l))}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <Link to='/garage' className='garage-link'>
          🏎 {t.garage}
          {garageCars.length > 0 && (
            <span className='garage-count'>{garageCars.length}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;