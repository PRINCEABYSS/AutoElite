import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLanguage } from '../../features/language/languageSlice';
import { translations } from '../../i18n/translations';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  
  const garageCars = useSelector(state => state.garage?.cars || []);
  const user = useSelector(state => state.auth?.user); 
  const lang = useSelector(state => state.language?.lang || 'ru');
  const t = translations[lang];

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false); 
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <header className={`header ${!isVisible ? 'header-hidden' : ''}`}>
      <div className='container header-content'>
     
        <Link to='/' className='logo' onClick={() => setIsMenuOpen(false)}>
          Auto<span>Elite</span>
        </Link>

        <button 
          className={`burger ${isMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>

     
        <nav className={isMenuOpen ? 'nav-active' : ''}>
          <ul onClick={() => setIsMenuOpen(false)}>
            <li><Link to='/'>{t.home}</Link></li>
            <li><Link to='/catalog'>{t.catalog}</Link></li>
            <li><Link to='/about'>{t.about}</Link></li>
            <li><Link to='/contact'>{t.contacts}</Link></li>
          </ul>
        </nav>

       
        <div className='header-actions'>
          
      
          <div className='lang-select-wrapper'>
            <div className='lang-current'>
              🌐 {lang.toUpperCase()}
            </div>
            <div className='lang-dropdown'>
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
          </div>

          <div className="user-group">
          
            <Link to='/garage' className='garage-link' onClick={() => setIsMenuOpen(false)}>
              <span className='emoji-icon'>🏎</span>
              <span className='garage-text'>{t.garage}</span>
              {garageCars.length > 0 && (
                <span className='garage-count'>{garageCars.length}</span>
              )}
            </Link>

            
            {user ? (
              <Link to='/profile' className='profile-trigger' onClick={() => setIsMenuOpen(false)}>
                <div className='avatar-wrapper'>
                  <div className='avatar-circle'>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className='online-badge'></span>
                </div>
                <div className='user-info-mini desktop-only'>
                  <span className='user-name-label'>{user.name}</span>
                  <span className='user-status-label'></span>
                </div>
              </Link>
            ) : (
              <Link to='/auth' className='login-trigger' onClick={() => setIsMenuOpen(false)}>
                <div className='login-icon-circle'>👤</div>
                <span className='desktop-only'>{t.login || 'Войти'}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;