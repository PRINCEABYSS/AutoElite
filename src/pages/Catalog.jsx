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

  const filteredCars = list.filter((car) => {
    return (
      (!brand || car.brand === brand) &&
      (!price || car.price <= Number(price))
    );
  });

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
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", textAlign: "center" }}>Машины не найдены</p>
        )}
      </div>
    </section>
  );
};

export default Catalog;