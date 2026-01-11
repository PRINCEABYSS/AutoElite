import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../features/cars/carsSlice";
import CarCard from "../components/CarCard/CarCard";
import Filters from "../components/Filters/Filters";

const Catalog = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.cars);
  
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCars());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div className="loader-container"><div className="spinner"></div></div>;
  }

  const filteredCars = (list || []).filter((car) => {
    const matchBrand = !brand || car.brand === brand;
    const matchPrice = !price || Number(car.price) <= Number(price);
    return matchBrand && matchPrice;
  });

  const carsToShow = filteredCars.slice(0, visibleCount);

  return (
    <section className="page-content">
      <h2 className="page-title">КАТАЛОГ</h2>
      <Filters brand={brand} setBrand={setBrand} price={price} setPrice={setPrice} />
      
      <div className="cars-grid">
        {carsToShow.length > 0 ? (
          carsToShow.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "50px", color: "white" }}>
            Машины не найдены
          </p>
        )}
      </div>

      {filteredCars.length > visibleCount && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn" onClick={() => setVisibleCount(prev => prev + 9)}>
            Показать еще
          </button>
        </div>
      )}
    </section>
  );
};

export default Catalog;