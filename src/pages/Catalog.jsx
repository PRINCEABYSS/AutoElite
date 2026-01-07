import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../features/cars/carsSlice";
import { translations } from "../i18n/translations";
import CarCard from "../components/CarCard/CarCard";
import Filters from "../components/Filters/Filters";

const Catalog = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.cars);
  const lang = useSelector((state) => state.language.lang);
  const t = translations[lang];

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  // --- НОВОЕ СОСТОЯНИЕ ---
  // Начинаем с 1 машины на бренд (или просто с небольшого числа, например 4)
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="page-content" style={{textAlign: 'center'}}>
        <h2 className="page-title">Ошибка</h2>
        <p>{error || "Не удалось загрузить данные"}</p>
        <button className="btn" onClick={() => dispatch(fetchCars())}>Попробовать снова</button>
      </div>
    );
  }

  // Сначала фильтруем список
  const filteredCars = list.filter((car) => {
    return (
      (!brand || car.brand === brand) &&
      (!price || car.price <= Number(price))
    );
  });

  // --- ЛОГИКА ОГРАНИЧЕНИЯ СПИСКА ---
  // Берем только ту часть списка, которая входит в visibleCount
  const carsToShow = filteredCars.slice(0, visibleCount);

  // Обработчик кнопки "Показать больше / меньше"
  const handleToggleCars = () => {
    if (visibleCount < filteredCars.length) {
      // Если еще есть что показывать, прибавляем 10
      setVisibleCount(prev => Math.min(prev + 10, filteredCars.length));
    } else {
     
      setVisibleCount(9);
    
    }
  };

  return (
    <section className="page-content">
      <h2 className="page-title">{t.catalog}</h2>
      <Filters
        brand={brand}
        setBrand={setBrand}
        price={price}
        setPrice={setPrice}
      />
      
      <div className="cars-grid">
        {carsToShow.length > 0 ? (
          carsToShow.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", textAlign: "center" }}>
            {lang === 'en' ? 'Loading failed' : 'В процессе загрузки'}
          </p>
        )}
      </div>

      {/* --- КНОПКА УПРАВЛЕНИЯ КОЛИЧЕСТВОМ --- */}
      {filteredCars.length > 4 && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn-load-more" onClick={handleToggleCars}>
            {visibleCount < filteredCars.length 
              ? (lang === 'en' ? `Show  More` : `Показать еще `)
              : (lang === 'en' ? `Show Less` : `Скрыть всё`)}
          </button>
        </div>
      )}
    </section>
  );
};

export default Catalog;