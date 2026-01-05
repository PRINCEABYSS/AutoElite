import { useSelector } from 'react-redux'
import './About.css'

const About = () => {
	const lang = useSelector(state => state.language.lang)

	const stats = [
		{
			id: 1,
			val: '10+',
			label: { ru: 'Лет на рынке', en: 'Years on market', kg: 'Жыл рынокто' },
		},
		{
			id: 2,
			val: '5000+',
			label: { ru: 'Клиентов', en: 'Clients', kg: 'Кардарлар' },
		},
		{
			id: 3,
			val: '50+',
			label: { ru: 'Брендов', en: 'Brands', kg: 'Бренддер' },
		},
		{
			id: 4,
			val: '24/7',
			label: { ru: 'Поддержка', en: 'Support', kg: 'Колдоо' },
		},
	]

	return (
		<div className='about-luxury-page'>
			{/* ВИДЕО ФОН */}
			<div className='video-container'>
				<video autoPlay loop muted playsInline className='luxury-video'>
					<source
						src='https://cdn.pixabay.com/video/2023/10/20/185793-876113110_large.mp4'
						type='video/mp4'
					/>
				</video>
				<div className='video-overlay'></div>
			</div>

			<div className='about-content container'>
				<div className='about-hero-glass'>
					<span className='premium-badge'>Exclusive Experience</span>
					<h1 className='main-title'>
						{lang === 'en'
							? 'Beyond Luxury'
							: lang === 'kg'
							? 'Люкс чегинен тышкары'
							: 'За пределами роскоши'}
					</h1>
					<p className='description'>
						{lang === 'en'
							? 'AutoElite is not just a car dealership. It is your entrance to the elite club of speed and status.'
							: 'AutoElite — это не просто автосалон. Это ваш вход в элитный клуб скорости и статуса.'}
					</p>
				</div>

				<div className='about-stats-row'>
					{stats.map(stat => (
						<div key={stat.id} className='stat-glass-card'>
							<h2 className='stat-number'>{stat.val}</h2>
							<p className='stat-text'>{stat.label[lang]}</p>
						</div>
					))}
				</div>

				<div className='mission-glass-card'>
					<div className='mission-accent'></div>
					<div className='mission-text'>
						<h3>{lang === 'en' ? 'Our Mission' : 'Наша миссия'}</h3>
						<p>
							{lang === 'en'
								? 'We set the gold standard in premium car delivery, making excellence accessible to you.'
								: 'Мы устанавливаем золотой стандарт в доставке премиальных авто, делая совершенство доступным для вас.'}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About
