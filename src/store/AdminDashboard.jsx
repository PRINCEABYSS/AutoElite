import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCar, fetchCars, removeCar } from '../features/cars/carsSlice'
import { toggleTheme } from '../features/theme/themeSlice'
import { logout } from '../store/slices/authSlice'
import './slices/AdminDashboard.css'

const AdminDashboard = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { list } = useSelector(state => state.cars)
	const theme = useSelector(state => state.theme?.theme || 'light')

	const [formData, setFormData] = useState({
		name: '',
		brand: '',
		price: '',
		image: '',
	})

	useEffect(() => {
		dispatch(fetchCars())
	}, [dispatch])

	const handleAdd = e => {
		e.preventDefault()
		dispatch(addCar({ ...formData, price: Number(formData.price) }))
		setFormData({ name: '', brand: '', price: '', image: '' })
	}

	return (
		<div className={`admin-container ${theme}`}>
			<aside className='sidebar'>
				<div className='logo'>
					AutoElite <span>Admin</span>
				</div>

				<button
					className='theme-toggle-btn'
					onClick={() => dispatch(toggleTheme())}
				>
					{theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
				</button>

				<nav className='admin-nav'>
					<button className='nav-item active'>Inventory</button>
				</nav>

				<button
					className='exit-btn'
					onClick={() => {
						dispatch(logout())
						navigate('/')
					}}
				>
					Exit System
				</button>
			</aside>

			<main className='main-content'>
				<div className='admin-grid'>
				
					<section className='admin-card'>
						<h3>Add New Vehicle</h3>
						<form onSubmit={handleAdd} className='add-form'>
							<input
								type='text'
								placeholder='Model'
								value={formData.name}
								onChange={e =>
									setFormData({ ...formData, name: e.target.value })
								}
								required
							/>
							<input
								type='text'
								placeholder='Brand'
								value={formData.brand}
								onChange={e =>
									setFormData({ ...formData, brand: e.target.value })
								}
								required
							/>
							<input
								type='number'
								placeholder='Price ($)'
								value={formData.price}
								onChange={e =>
									setFormData({ ...formData, price: e.target.value })
								}
								required
							/>
							<input
								type='text'
								placeholder='Image URL'
								value={formData.image}
								onChange={e =>
									setFormData({ ...formData, image: e.target.value })
								}
								required
							/>

							{formData.image && (
								<div className='img-preview'>
									<img src={formData.image} alt='Preview' />
								</div>
							)}

							<button type='submit' className='submit-btn'>
								Save to Cloud
							</button>
						</form>
					</section>

					<section className='admin-card'>
						<h3>Current Fleet ({list.length})</h3>
						<div className='car-list-scroll'>
							{list.map(car => (
								<div key={car.id} className='car-item'>
									<div className='car-img-box'>
										<img src={car.image} alt={car.name} />
									</div>
									<div className='car-details'>
										<strong>
											{car.brand} {car.name}
										</strong>
										<span>${car.price}</span>
									</div>
									<button
										className='delete-icon-btn'
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
