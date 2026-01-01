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
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false); 
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
        <Link to='/' className='logo' onClick={() => setIsMenuOpen(false)}>
          Auto<span>Elite</span>
        </Link>

        <button className={`burger ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={isMenuOpen ? 'nav-active' : ''}>
          <ul onClick={() => setIsMenuOpen(false)}>
            <li><Link to='/'>{t.home}</Link></li>
            <li><Link to='/catalog'>{t.catalog}</Link></li>
            <li><Link to='/about'>{t.about}</Link></li>
            <li><Link to='/contact'>{t.contacts}</Link></li>
          </ul>
          
           
          <div className='lang-switch mobile-only'>
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
        </nav>

        <div className='header-actions'>
           <div className='lang-switch desktop-only'>
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

          <Link to='/garage' className='garage-link' onClick={() => setIsMenuOpen(false)}>
            <span>🏎</span>
            <span className='garage-text'>{t.garage}</span>
            {garageCars.length > 0 && (
              <span className='garage-count'>{garageCars.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;