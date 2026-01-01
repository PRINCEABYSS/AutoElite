import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToGarage } from '../../features/garage/garageSlice'

const CarCard = ({ car }) => {
	const dispatch = useDispatch()

	const cardImage = car.images && car.images[0] ? car.images[0] : car.image

	return (
		<div className='car-card'>
			<div
				className='car-image'
				style={{
					backgroundImage: `url(${cardImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					height: '200px',
				}}
			/>

			<div className='car-info'>
				<h3>
					{car.brand} {car.model}
				</h3>
				<p className='car-price'>${car.price?.toLocaleString()}</p>

				<div
					className='card-actions'
					style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
				>
					<button className='btn' onClick={() => dispatch(addToGarage(car))}>
						В гараж
					</button>
					<Link
						to={`/catalog/${car.id}`}
						className='btn btn-secondary'
						style={{ textAlign: 'center' }}
					>
						Подробнее
					</Link>
				</div>
			</div>
		</div>
	)
}

export default CarCard
