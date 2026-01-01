import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { addToGarage } from '../features/garage/garageSlice'

import Brands from './Brands'

import './Home.css'

const Home = () => {
	const lang = useSelector(state => state.language.lang)

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const recommendedCars = [
		{
			id: 'f1',
			brand: 'Ferrari',
			model: '488 GTB',
			price: 250000,
			image:
				'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1000',
			desc: {
				ru: 'Спортивный автомобиль с потрясающими характеристиками',
				en: 'Sports car with stunning performance',
				kg: 'Укмуштуудай мүнөздөмөлөрү бар спорттук унаа',
			},
		},

		{
			id: 'b1',
			brand: 'Bugatti',
			model: 'Chiron',
			price: 3000000,
			image:
				'https://s.auto.drom.ru/i24212/c/photos/fullsize/bugatti/chiron/bugatti_chiron_750283.jpg',
			desc: {
				ru: 'Гиперкар нового поколения',
				en: 'New generation hypercar',
				kg: 'Жаңы муундун гиперкары',
			},
		},

		{
			id: 'bm1',
			brand: 'BMW',
			model: 'M8',
			price: 150000,
			image:
				'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000',
			desc: {
				ru: 'Сочетание роскоши и производительности',
				en: 'Combination of luxury and performance',
				kg: 'Люкс менен өндүрүмдүүлүктүн айкалышы',
			},
		},

		{
			id: 'l1',
			brand: 'Lexus',
			model: 'LC 500',
			price: 120000,
			image:
				'https://www.allcarz.ru/wp-content/uploads/2017/01/foto-lexus-ls-5_01.jpg',
			desc: {
				ru: 'Роскошное купе с выдающимся дизайном',
				en: 'Luxury coupe with outstanding design',
				kg: 'Көрүнүктүү дизайны бар люкс купе',
			},
		},

		{
			id: 't1',
			brand: 'Tesla',
			model: 'Model S Plaid',
			price: 140000,
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXe1Kb5HfE5Q_DRK0JohJ4L4tVtCRu6OJ-RA&s',
			desc: {
				ru: 'Электрический седан с невероятной производительностью',
				en: 'Electric sedan with incredible performance',
				kg: 'Укмуштуудай өндүрүмдүүлүгү бар электр седаны',
			},
		},

		{
			id: 'lb1',
			brand: 'Lamborghini',
			model: 'Aventador',
			price: 400000,
			image:
				'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000',
			desc: {
				ru: 'Экстремальный суперкар с агрессивным дизайном',
				en: 'Extreme supercar with aggressive design',
				kg: 'Агрессивдүү дизайны бар экстремалдык суперкар',
			},
		},
	]

	return (
		<div className='home-page'>
			<section className='hero-section'>
				<div className='hero-overlay'>
					<div className='hero-content'>
						<h1>
							{lang === 'en'
								? 'Premium World Cars'
								: lang === 'kg'
								? 'Дүйнөлүк премиум унаалар'
								: 'Премиальные автомобили мира'}
						</h1>

						<p>
							{lang === 'en'
								? 'Find your perfect car among the best global brands'
								: lang === 'kg'
								? 'Эң мыкты бренддердин арасынан идеалдуу унааңызды табыңыз'
								: 'Найдите свой идеальный автомобиль среди лучших мировых брендов'}
						</p>

						<button onClick={() => navigate('/catalog')} className='hero-btn'>
							{lang === 'en'
								? 'Catalog'
								: lang === 'kg'
								? 'Каталог'
								: 'Смотреть каталог'}
						</button>
					</div>
				</div>
			</section>

			<Brands />

			<section className='recommended-section'>
				<div className='container'>
					<h2 className='section-title'>
						{lang === 'en'
							? 'Recommended Cars'
							: lang === 'kg'
							? 'Сунушталган унаалар'
							: 'Рекомендуемые автомобили'}
					</h2>

					<div className='recommended-grid'>
						{recommendedCars.map(car => (
							<div key={car.id} className='modern-car-card'>
								<div className='image-box'>
									<img src={car.image} alt={car.model} />

									<div className='price-tag'>€{car.price.toLocaleString()}</div>
								</div>

								<div className='card-info'>
									<h3>
										{car.brand} {car.model}
									</h3>

									<p>{car.desc[lang]}</p>

									<div className='card-actions'>
										<button
											className='btn-add-garage'
											onClick={() => dispatch(addToGarage(car))}
										>
											{lang === 'en'
												? 'In Garage'
												: lang === 'kg'
												? 'Гаражга'
												: 'В гараж'}
										</button>

										<button
											className='btn-details'
											onClick={() => navigate(`/catalog/${car.id}`)}
										>
											{lang === 'en'
												? 'Details'
												: lang === 'kg'
												? 'Кененирээк'
												: 'Подробнее'}
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Home
