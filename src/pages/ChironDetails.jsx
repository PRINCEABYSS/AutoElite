import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addToGarage } from '../features/garage/garageSlice'

import bmwVid from '../assets/бмв видео.mp4'
import bugattiVid from '../assets/буггати видео.mp4'
import lamboVid from '../assets/ламборгини видео.mp4'
import lexsusVid from '../assets/лексус видео.mp4'
import teslaVid from '../assets/тесла видео.mp4'
import ferrariVid from '../assets/феррари видео.mp4'

const ChironDetails = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const lang = useSelector(state => state.language.lang)
	const [isAdded, setIsAdded] = useState(false)

	const localData = {
		b1: {
			brand: 'Bugatti',
			model: 'Chiron',
			price: 3000000,
			video: bugattiVid,
			year: 2023,
			engine: '8.0L W16',
			hp: 1500,
			acc: '2.4s',
			speed: '420 km/h',
			drive: 'AWD',
			img: 'https://s.auto.drom.ru/i24212/c/photos/fullsize/bugatti/chiron/bugatti_chiron_750283.jpg',
			desc: {
				ru: 'Гиперкар нового поколения',
				en: 'New generation hypercar',
				kg: 'Жаңы муундун гиперкары',
			},
		},
		bm1: {
			brand: 'BMW',
			model: 'M8',
			price: 150000,
			video: bmwVid,
			year: 2024,
			engine: '4.4L V8',
			hp: 625,
			acc: '3.2s',
			speed: '305 km/h',
			drive: 'xDrive',
			img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000',
			desc: {
				ru: 'Сочетание роскоши и производительности',
				en: 'Combination of luxury and performance',
				kg: 'Люкс менен өндүрүмдүүлүктүн айкалышы',
			},
		},
		f1: {
			brand: 'Ferrari',
			model: '488 GTB',
			price: 250000,
			video: ferrariVid,
			year: 2022,
			engine: '3.9L V8',
			hp: 670,
			acc: '3.0s',
			speed: '330 km/h',
			drive: 'RWD',
			img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1000',
			desc: {
				ru: 'Спортивный автомобиль с потрясающими характеристиками',
				en: 'Sports car with stunning performance',
				kg: 'Укмуштуудай мүнөздөмөлөрү бар спорттук унаа',
			},
		},
		l1: {
			brand: 'Lexus',
			model: 'LC 500',
			price: 120000,
			video: lexsusVid,
			year: 2023,
			engine: '5.0L V8',
			hp: 471,
			acc: '4.4s',
			speed: '270 km/h',
			drive: 'RWD',
			img: 'https://www.allcarz.ru/wp-content/uploads/2017/01/foto-lexus-ls-5_01.jpg',
			desc: {
				ru: 'Роскошное купе с выдающимся дизайном',
				en: 'Luxury coupe with outstanding design',
				kg: 'Көрүнүктүү дизайны бар люкс купе',
			},
		},
		t1: {
			brand: 'Tesla',
			model: 'Model S Plaid',
			price: 140000,
			video: teslaVid,
			year: 2024,
			engine: 'Electric',
			hp: 1020,
			acc: '2.1s',
			speed: '322 km/h',
			drive: 'AWD',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXe1Kb5HfE5Q_DRK0JohJ4L4tVtCRu6OJ-RA&s',
			desc: {
				ru: 'Электрический седан с невероятной производительностью',
				en: 'Electric sedan with incredible performance',
				kg: 'Укмуштуудай өндүрүмдүүлүгү бар электр седаны',
			},
		},
		lb1: {
			brand: 'Lamborghini',
			model: 'Aventador',
			price: 400000,
			video: lamboVid,
			year: 2022,
			engine: '6.5L V12',
			hp: 740,
			acc: '2.9s',
			speed: '350 km/h',
			drive: 'AWD',
			img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000',
			desc: {
				ru: 'Экстремальный суперкар с агрессивным дизайном',
				en: 'Extreme supercar with aggressive design',
				kg: 'Агрессивдүү дизайны бар экстремалдык суперкар',
			},
		},
	}

	const car = localData[id]

	if (!car)
		return (
			<div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>
				Машина не найдена в списке рекомендованных
			</div>
		)

	return (
		<div
			style={{
				position: 'relative',
				minHeight: '100vh',
				color: '#fff',
				overflow: 'hidden',
			}}
		>
			<video
				autoPlay
				muted
				loop
				playsInline
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					zIndex: -2,
				}}
			>
				<source src={car.video} type='video/mp4' />
			</video>
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					background: 'rgba(0,0,0,0.6)',
					zIndex: -1,
				}}
			></div>

			<div
				style={{
					maxWidth: '1200px',
					margin: '0 auto',
					paddingTop: '100px',
					paddingLeft: '20px',
					paddingRight: '20px',
				}}
			>
				<div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
					<img
						src={car.img}
						alt={car.model}
						style={{
							width: '100%',
							maxWidth: '600px',
							borderRadius: '20px',
							height: '400px',
							objectFit: 'cover',
						}}
					/>

					<div style={{ flex: 1 }}>
						<span style={{ color: '#ff6b35', fontWeight: 'bold' }}>
							{car.brand}
						</span>
						<h1 style={{ fontSize: '3.5rem', margin: '10px 0' }}>
							{car.model}
						</h1>
						<h2 style={{ color: '#ff6b35', fontSize: '2.5rem' }}>
							${car.price.toLocaleString()}
						</h2>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								gap: '15px',
								margin: '30px 0',
							}}
						>
							<div style={sBox}>
								<strong>Год:</strong> {car.year}
							</div>
							<div style={sBox}>
								<strong>Двигатель:</strong> {car.engine}
							</div>
							<div style={sBox}>
								<strong>Мощность:</strong> {car.hp} hp
							</div>
							<div style={sBox}>
								<strong>0-100:</strong> {car.acc}
							</div>
						</div>

						<p style={{ color: '#ccc', marginBottom: '30px' }}>
							{car.desc[lang] || car.desc['ru']}
						</p>

						<div style={{ display: 'flex', gap: '20px' }}>
							<button
								onClick={() => {
									dispatch(addToGarage(car))
									setIsAdded(true)
									setTimeout(() => setIsAdded(false), 2000)
								}}
								style={{
									padding: '15px 30px',
									background: isAdded ? '#27ae60' : '#ff6b35',
									border: 'none',
									borderRadius: '10px',
									color: '#fff',
									fontWeight: 'bold',
									cursor: 'pointer',
								}}
							>
								{isAdded ? 'В ГАРАЖЕ!' : 'Забронировать'}
							</button>
							<button
								onClick={() => navigate(-1)}
								style={{
									padding: '15px 30px',
									background: 'rgba(255,255,255,0.1)',
									border: '1px solid #fff',
									borderRadius: '10px',
									color: '#fff',
									cursor: 'pointer',
								}}
							>
								Назад
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const sBox = {
	background: 'rgba(255,255,255,0.1)',
	padding: '15px',
	borderRadius: '10px',
}

export default ChironDetails
