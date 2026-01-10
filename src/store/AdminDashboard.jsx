import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCar, fetchCars, removeCar } from '../features/cars/carsSlice'
import './slices/AdminDashboard.css'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { list, status } = useSelector(state => state.cars)

  // 1. Добавлено поле videoUrl в состояние
  const [formData, setFormData] = useState({
    model: '',
    brand: '',
    price: '',
    image: '',
    videoUrl: '',     // <--- Поле для видео фона
    year: '',
    engine: '',
    hp: '',
    acceleration: '',
    speed: '',
    drive: ''
  })

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCars())
  }, [dispatch, status])

  const handleAdd = async (e) => {
    e.preventDefault()
    const carData = { 
      ...formData, 
      price: Number(formData.price),
      year: Number(formData.year),
      hp: Number(formData.hp)
    }
    
    const result = await dispatch(addCar(carData))
    
    if (addCar.fulfilled.match(result)) {
      // Очистка всех полей, включая видео
      setFormData({ 
        model: '', brand: '', price: '', image: '', 
        videoUrl: '', 
        year: '', engine: '', hp: '', acceleration: '', 
        speed: '', drive: '' 
      })
    }
  }

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">Auto<span>Elite</span></div>
        <button className="nav-item">Управление авто</button>
        <button className="exit-btn">Выйти</button>
      </aside>

      <main className="main-content">
        <h2>Админ-панель</h2>
        
        <div className="admin-grid">
          <section className="admin-card">
            <h3>Добавить новый автомобиль</h3>
            <form onSubmit={handleAdd} className="add-form">
              <div className="form-group">
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
              </div>

              <div className="specs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                <input 
                  type='number' placeholder='Год (2023)' 
                  value={formData.year} 
                  onChange={e => setFormData({ ...formData, year: e.target.value })} 
                />
                <input 
                  placeholder='Двигатель (6.5L V12)' 
                  value={formData.engine} 
                  onChange={e => setFormData({ ...formData, engine: e.target.value })} 
                />
                <input 
                  type='number' placeholder='Мощность (hp)' 
                  value={formData.hp} 
                  onChange={e => setFormData({ ...formData, hp: e.target.value })} 
                />
                <input 
                  placeholder='0-100 км/ч (2.9 sec)' 
                  value={formData.acceleration} 
                  onChange={e => setFormData({ ...formData, acceleration: e.target.value })} 
                />
                <input 
                  placeholder='Скорость (340 km/h)' 
                  value={formData.speed} 
                  onChange={e => setFormData({ ...formData, speed: e.target.value })} 
                />
                <input 
                  placeholder='Привод (Rear-wheel)' 
                  value={formData.drive} 
                  onChange={e => setFormData({ ...formData, drive: e.target.value })} 
                />
              </div>

              <input 
                type='number' 
                placeholder='Цена ($)' 
                value={formData.price} 
                style={{ marginTop: '10px' }}
                onChange={e => setFormData({ ...formData, price: e.target.value })} 
                required 
              />
              
              <div className="media-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                <input 
                  placeholder='URL основной картинки (jpg/png)' 
                  value={formData.image} 
                  onChange={e => setFormData({ ...formData, image: e.target.value })} 
                  required 
                />
                {/* НОВОЕ ПОЛЕ: Ссылка на видео */}
                <input 
                  placeholder='URL фонового видео (.mp4)' 
                  value={formData.videoUrl} 
                  onChange={e => setFormData({ ...formData, videoUrl: e.target.value })} 
                />
              </div>
              
              {formData.image && (
                <div className="img-preview" style={{ marginTop: '10px' }}>
                  <img src={formData.image} alt="Preview" style={{ width: '100px', borderRadius: '5px' }} />
                </div>
              )}
              
              <button type='submit' className="submit-btn">Добавить в базу</button>
            </form>
          </section>

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
                    <div style={{ fontSize: '10px', color: car.videoUrl ? '#4caf50' : '#888' }}>
                      {car.videoUrl ? '✓ Видео фон добавлен' : '✕ Без видео'}
                    </div>
                    <span>${car.price?.toLocaleString()}</span>
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