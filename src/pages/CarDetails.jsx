import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../Api/axios'

import { addToGarage } from '../features/garage/garageSlice'


import audi from '../assets/PixVerse_V5.5_Image_Text_360P_сделай_мне_69_се.mp4'
import bmw from '../assets/бмв видео.mp4'
import bugatti from '../assets/буггати видео.mp4'
import lamborgini from '../assets/ламборгини видео.mp4'
import lexsus from '../assets/лексус видео.mp4'
import mers from '../assets/мерс видео.mp4'
import porshe from '../assets/порше видео для проекта.mp4'
import tesla from '../assets/тесла видео.mp4'
import toyota from '../assets/тойота видео.mp4'
import ferrari from '../assets/феррари видео.mp4'

const CarDetails = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [car, setCar] = useState(null)
	const [loading, setLoading] = useState(true)
	const [activeImg, setActiveImg] = useState(0)
	const [isAdded, setIsAdded] = useState(false)

	const videoMap = {
		Ferrari: ferrari,
		Bugatti: bugatti,
		Toyota: toyota,
		BMW: bmw,
		'Mercedes-Benz': mers,
		Audi: audi,
		Lamborghini: lamborgini,
		Porsche: porshe,
		Lexus: lexsus,
		Tesla: tesla,
	}

	useEffect(() => {
		const getCarDetails = async () => {
			try {
				setLoading(true)
				const res = await api.get('/cars/premium/cars')
				const foundCar = res.data.find(item => item.id == id)
				setCar(foundCar || null)
			} catch (err) {
				console.error('Ошибка при загрузке деталей:', err)
			} finally {
				setLoading(false)
			}
		}
		if (id) getCarDetails()
	}, [id])

	const handleAddToGarage = () => {
		if (car) {
			dispatch(addToGarage(car)) 
			setIsAdded(true)
		
			setTimeout(() => setIsAdded(false), 2000)
		}
	}

	if (loading)
		return (
			<div className='loader-container'>
				<div className='spinner'></div>
			</div>
		)

	if (!car)
		return (
			<div style={{ textAlign: 'center', padding: '100px', color: '#fff' }}>
				<h2>Машина не найдена</h2>
				<button className='btn-back-glass' onClick={() => navigate(-1)}>
					Назад
				</button>
			</div>
		)

	const allImages =
		car.images && car.images.length > 0 ? car.images : [car.image]
	const currentVideo = videoMap[car.brand]

	return (
		<div className='car-details-page' style={pageWrapperStyle}>
			
			{currentVideo && (
				<>
					<video
						autoPlay
						muted
						loop
						playsInline
						key={currentVideo}
						style={videoBackgroundStyle}
					>
						<source src={currentVideo} type='video/mp4' />
					</video>
					<div style={videoOverlayStyle}></div>
				</>
			)}

			<div className='page-content' style={contentContainerStyle}>
				<div style={flexRowStyle}>
				
					<div style={{ flex: '1.2', minWidth: '350px' }}>
						<div style={{ position: 'relative' }}>
							<img
								src={allImages[activeImg]}
								alt={car.model}
								style={mainImageStyle}
							/>
						</div>

						<div style={thumbnailsContainerStyle}>
							{allImages.map((img, index) => (
								<img
									key={index}
									src={img}
									onClick={() => setActiveImg(index)}
									style={{
										width: '80px',
										height: '55px',
										borderRadius: '10px',
										cursor: 'pointer',
										objectFit: 'cover',
										border:
											activeImg === index
												? '2px solid #ff6b35'
												: '2px solid transparent',
										opacity: activeImg === index ? 1 : 0.6,
										transition: '0.3s',
									}}
								/>
							))}
						</div>
					</div>

					<div style={{ flex: '1', minWidth: '350px', color: '#fff' }}>
						<div style={{ marginBottom: '30px' }}>
							<span style={brandBadgeStyle}>{car.brand}</span>
							<h1 style={modelTitleStyle}>{car.model}</h1>
							<div style={priceStyle}>
								${Number(car.price).toLocaleString()}
							</div>
						</div>

						<div style={specsGridStyle}>
							<div style={specBoxStyle}>
								<strong>Год:</strong> {car.year}
							</div>
							<div style={specBoxStyle}>
								<strong>Двигатель:</strong> {car.engine}
							</div>
							<div style={specBoxStyle}>
								<strong>Мощность:</strong> {car.horsepower} hp
							</div>
							<div style={specBoxStyle}>
								<strong>0-100:</strong> {car.acceleration}
							</div>
							<div style={specBoxStyle}>
								<strong>Скорость:</strong> {car.topSpeed}
							</div>
							<div style={specBoxStyle}>
								<strong>Привод:</strong> {car.driveType}
							</div>
						</div>

						{car.description && (
							<div style={{ marginBottom: '35px' }}>
								<h4 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>
									О модели
								</h4>
								<p style={descriptionStyle}>{car.description}</p>
							</div>
						)}

						<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
							<button
								className={`btn-main-action ${isAdded ? 'added' : ''}`}
								onClick={handleAddToGarage}
							>
								{isAdded ? 'В ГАРАЖЕ!' : 'Забронировать'}
							</button>

							<button className='btn-back-glass' onClick={() => navigate(-1)}>
								<span style={{ marginRight: '8px' }}>←</span> Назад
							</button>
						</div>
					</div>
				</div>
			</div>

			<style>{`
        .btn-main-action {
          padding: 16px 45px;
          background: #ff6b35;
          color: white;
          border: none;
          border-radius: 14px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
        }
        .btn-main-action:hover {
          background: #e55a2b;
          transform: translateY(-2px);
        }
        .btn-main-action.added {
          background: #27ae60;
          box-shadow: 0 10px 20px rgba(39, 174, 96, 0.4);
        }
        .btn-back-glass {
          padding: 15px 35px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        .btn-back-glass:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #ff6b35;
          color: #ff6b35;
        }
      `}</style>
		</div>
	)
}

const pageWrapperStyle = {
	position: 'relative',
	minHeight: '100vh',
	overflow: 'hidden',
}
const videoBackgroundStyle = {
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	zIndex: -2,
}
const videoOverlayStyle = {
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	background: 'rgba(0,0,0,0.65)',
	zIndex: -1,
}
const contentContainerStyle = {
	paddingTop: '80px',
	paddingBottom: '60px',
	maxWidth: '1200px',
	margin: '0 auto',
	position: 'relative',
	zIndex: 1,
}
const flexRowStyle = {
	display: 'flex',
	gap: '50px',
	flexWrap: 'wrap',
	alignItems: 'flex-start',
}
const mainImageStyle = {
	width: '100%',
	borderRadius: '30px',
	height: '500px',
	objectFit: 'cover',
	boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
}
const thumbnailsContainerStyle = {
	display: 'flex',
	gap: '12px',
	marginTop: '20px',
	overflowX: 'auto',
	paddingBottom: '10px',
}
const brandBadgeStyle = {
	color: '#ff6b35',
	fontWeight: 'bold',
	textTransform: 'uppercase',
	letterSpacing: '2px',
	fontSize: '1rem',
}
const modelTitleStyle = {
	fontSize: '4rem',
	margin: '5px 0',
	fontWeight: '900',
	lineHeight: '1.1',
}
const priceStyle = {
	fontSize: '3rem',
	fontWeight: '800',
	color: '#ff6b35',
	marginTop: '15px',
}
const specsGridStyle = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gap: '15px',
	marginBottom: '35px',
}
const specBoxStyle = {
	background: 'rgba(255,255,255,0.1)',
	padding: '15px',
	borderRadius: '12px',
	border: '1px solid rgba(255,255,255,0.1)',
	color: '#fff',
}
const descriptionStyle = {
	color: '#ccc',
	lineHeight: '1.7',
	fontSize: '1.1rem',
	maxWidth: '500px',
}

export default CarDetails
