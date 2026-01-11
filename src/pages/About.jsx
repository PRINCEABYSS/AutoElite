import { useSelector } from 'react-redux';
import bgVideo from '../assets/задний фон.mp4';
import './About.css';

const About = () => {
  const lang = useSelector(state => state.language.lang);

  const stats = [
    {
      id: 1,
      val: '10+',
      label: { ru: 'Лет на рынке', en: 'Years on market', kg: 'Жыл рынокто' },
    },
    {
      id: 2,
      val: '5000+',
      label: { ru: 'Клиентов', en: 'Clients', kg: 'Кардарлар' },
    },
    {
      id: 3,
      val: '50+',
      label: { ru: 'Брендов', en: 'Brands', kg: 'Бренддер' },
    },
    {
      id: 4,
      val: '24/7',
      label: { ru: 'Поддержка', en: 'Support', kg: 'Колдоо' },
    },
  ];

  const content = {
    badge: { ru: 'Эксклюзивный опыт', en: 'Exclusive Experience', kg: 'Эксклюзивдүү тажрыйба' },
    title: { ru: 'За пределами роскоши', en: 'Beyond Luxury', kg: 'Люкс чегинен тышкары' },
    desc: {
      ru: 'AutoElite — это не просто автосалон. Это ваш вход в элитный клуб скорости и статуса.',
      en: 'AutoElite is not just a car dealership. It is your entrance to the elite club of speed and status.',
      kg: 'AutoElite — бул жөн гана автосалон эмес. Бул сиздин ылдамдык жана статус элиталык клубуна кирүүңүз.',
    },
    missionTitle: { ru: 'Наша миссия', en: 'Our Mission', kg: 'Биздин миссия' },
    missionDesc: {
      ru: 'Мы устанавливаем золотой стандарт в доставке премиальных авто, делая совершенство доступным для вас.',
      en: 'We set the gold standard in premium car delivery, making excellence accessible to you.',
      kg: 'Биз премиум автоунааларды жеткирүүдө алтын стандартты орнотуп, сиз үчүн кемчиликсиздикти жеткиликтүү кылабыз.',
    }
  };

  return (
    <div className='about-luxury-page'>
      <div className="video-background-container">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className='about-content container'>
        <header className='about-hero-glass'>
          <span className='premium-badge'>{content.badge[lang]}</span>
          <h1 className='main-title'>{content.title[lang]}</h1>
          <p className='description'>{content.desc[lang]}</p>
        </header>

        <div className='about-stats-grid'>
          {stats.map(stat => (
            <div key={stat.id} className='stat-glass-card'>
              <h2 className='stat-number'>{stat.val}</h2>
              <p className='stat-text'>{stat.label[lang]}</p>
            </div>
          ))}
        </div>

        <section className='mission-glass-card'>
          <div className='mission-accent'></div>
          <div className='mission-inner'>
            <h3>{content.missionTitle[lang]}</h3>
            <p>{content.missionDesc[lang]}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;