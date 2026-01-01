import React from 'react';
import { useSelector } from 'react-redux';
import { translations } from '../i18n/translations';
import './Brands.css';

const Brands = () => {

  const lang = useSelector((state) => state.language.lang);
  
 
  const t = translations[lang];

  const brandsData = [
    { 
      id: 1, name: 'Ferrari', logo: 'https://images.seeklogo.com/logo-png/28/2/ferrari-emblem-logo-png_seeklogo-289603.png',
      desc: { ru: 'Итальянская роскошь', en: 'Italian luxury', kg: 'Италиялык люкс' }
    },
    { 
      id: 2, name: 'Bugatti', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Bugatti_Logo.png',
      desc: { ru: 'Французская элегантность', en: 'French elegance', kg: 'Франциялык элеганттуулук' }
    },
    { 
      id: 3, name: 'Toyota', logo: 'https://png.klev.club/uploads/posts/2024-04/png-klev-club-qs8w-p-toiota-png-6.png',
      desc: { ru: 'Японская надежность', en: 'Japanese reliability', kg: 'Япониялык ишенимдүүлүк' }
    },
    { 
      id: 4, name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png',
      desc: { ru: 'Немецкое качество', en: 'German quality', kg: 'Германиялык сапат' }
    },
    { 
      id: 5, name: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
      desc: { ru: 'Эталон комфорта', en: 'Standard of comfort', kg: 'Комфорттун эталону' }
    },
    { 
      id: 6, name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1200px-Audi-Logo_2016.svg.png',
      desc: { ru: 'Инновации и стиль', en: 'Innovation and style', kg: 'Инновация жана стиль' }
    },
    { 
      id: 7, name: 'Lamborghini', logo: 'https://upload.wikimedia.org/wikipedia/ru/archive/1/1d/20221207173001%21Lamborghini_Logo1.png',
      desc: { ru: 'Экстремальный дизайн', en: 'Extreme design', kg: 'Экстремалдык дизайн' }
    },
    { 
      id: 8, name: 'Porsche', logo: 'https://e7.pngegg.com/pngimages/417/210/png-clipart-porsche-logo-porsche-911-porsche-panamera-logo-porsche-car-logo-brand-emblem-label-thumbnail.png',
      desc: { ru: 'Спортивное превосходство', en: 'Sports excellence', kg: 'Спорттук артыкчылык' }
    },
    { 
      id: 9, name: 'Lexus', logo: 'https://www.auto-dd.ru/wp-content/uploads/2022/09/lexus-logo_01-920x518.png',
      desc: { ru: 'Японская роскошь', en: 'Japanese luxury', kg: 'Япониялык люкс' }
    },
    { 
      id: 10, name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png',
      desc: { ru: 'Электрическое будущее', en: 'Electric future', kg: 'Электрдик келечек' }
    }
  ];

  return (
    <section className="brands-section">
      <div className="container">
        
        <h2 className="section-title">{t.brands}</h2> 
        
        <div className="brands-grid">
          {brandsData.map((brand) => (
            <div key={brand.id} className="brand-card">
              <div className="brand-logo-wrapper">
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              </div>
              <h3 className="brand-name">{brand.name}</h3>
              
              <p className="brand-desc">{brand.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;