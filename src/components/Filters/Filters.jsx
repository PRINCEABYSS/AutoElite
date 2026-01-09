import React from 'react';
import { useSelector } from "react-redux";

const Filters = ({ brand, setBrand, price, setPrice }) => {
  const { list } = useSelector((state) => state.cars);
  
  // Безопасный map для создания списка брендов
  const uniqueBrands = [...new Set((list || []).map(car => car.brand))].filter(Boolean);

  return (
    <div className="filters">
      <select value={brand} onChange={(e) => setBrand(e.target.value)} className="filter-select">
        <option value="">Все бренды</option>
        {uniqueBrands.map(b => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Макс. цена ($)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="filter-input"
      />
    </div>
  );
};

export default Filters;