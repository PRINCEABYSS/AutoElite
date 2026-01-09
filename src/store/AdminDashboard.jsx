import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCar, fetchCars, removeCar } from '../features/cars/carsSlice'
import './slices/AdminDashboard.css'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { list, status } = useSelector(state => state.cars)

  const [formData, setFormData] = useState({
    model: '',
    brand: '',
    price: '',
    image: '',
  })

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCars())
  }, [dispatch, status])

  const handleAdd = async (e) => {
    e.preventDefault()
    const carData = { ...formData, price: Number(formData.price) }
    const result = await dispatch(addCar(carData))
    
    if (addCar.fulfilled.match(result)) {
      setFormData({ model: '', brand: '', price: '', image: '' })
    }
  }

  return (
    <div className="admin-container">
      {/* Боковая панель (Sidebar) */}
      <aside className="sidebar">
        <div className="logo">Auto<span>Elite</span></div>
        <button className="nav-item">Управление авто</button>
        <button className="exit-btn">Выйти</button>
      </aside>

      {/* Основной контент */}
      <main className="main-content">
        <h2>Админ-панель</h2>
        
        <div className="admin-grid">
          {/* Форма добавления */}
          <section className="admin-card">
            <h3>Добавить новый автомобиль</h3>
            <form onSubmit={handleAdd} className="add-form">
              <input 
                placeholder='Марка (напр. Ferrari)' 
                value={formData.brand} 
                onChange={e => setFormData({ ...formData, brand: e.target.value })} 
                required 
              />
              <input 
                placeholder='Модель' 
                value={formData.model} 
                onChange={e => setFormData({ ...formData, model: e.target.value })} 
                required 
              />
              <input 
                type='number' 
                placeholder='Цена' 
                value={formData.price} 
                onChange={e => setFormData({ ...formData, price: e.target.value })} 
                required 
              />
              <input 
                placeholder='URL изображения' 
                value={formData.image} 
                onChange={e => setFormData({ ...formData, image: e.target.value })} 
                required 
              />
              
              {formData.image && (
                <div className="img-preview">
                  <img src={formData.image} alt="Preview" />
                </div>
              )}
              
              <button type='submit' className="submit-btn">Добавить в базу</button>
            </form>
          </section>

          {/* Список машин */}
          <section className="admin-card">
            <h3>Текущие машины ({list?.length})</h3>
            <div className="car-list-scroll">
              {list?.map(car => (
                <div key={car.id} className="car-item">
                  <div className="car-img-box">
                    <img src={car.image || 'https://via.placeholder.com/80'} alt={car.model} />
                  </div>
                  <div className="car-details">
                    <strong>{car.brand} {car.model}</strong>
                    <span>${car.price.toLocaleString()}</span>
                  </div>
                  <button 
                    className="delete-icon-btn" 
                    onClick={() => dispatch(removeCar(car.id))}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard