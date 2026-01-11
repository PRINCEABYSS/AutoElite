import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useSelector } from 'react-redux'
import buy from '../assets/покупатель.mp4'
import './Contact.css'

const customIcon = new L.Icon({
	iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
	iconSize: [40, 40],
	iconAnchor: [20, 40],
	popupAnchor: [0, -40],
})

const Contact = () => {
	const lang = useSelector(state => state.language.lang)
	const [status, setStatus] = useState('idle')
	const position = [42.8425, 74.5681]

	const handleSubmit = e => {
		e.preventDefault()
		setStatus('sending')
		setTimeout(() => setStatus('success'), 2000)
	}

	const t = {
		title: { ru: 'Контакты', en: 'Contacts', kg: 'Байланыштар' },
		name: { ru: 'Ваше имя', en: 'Your Name', kg: 'Сиздин атыңыз' },
		email: { ru: 'Ваш Email', en: 'Your Email', kg: 'Сиздин Email' },
		message: { ru: 'Сообщение', en: 'Message', kg: 'Билдирүү' },
		send: { ru: 'Отправить', en: 'Send', kg: 'Жөнөтүү' },
		success: { ru: 'Отправлено!', en: 'Sent!', kg: 'Жөнөтүлдү!' },
	}

	return (
		<div className='contact-page'>
			<div className='video-bg-wrapper'>
				<video autoPlay loop muted playsInline className='luxury-video'>
					<source src={buy} type='video/mp4' />
				</video>
				<div className='video-overlay'></div>
			</div>

			<div className='container contact-container'>
				<h1 className='contact-main-title'>{t.title[lang]}</h1>

				<div className='contact-grid'>
					<div className='contact-info-side'>
						<div className='glass-card contact-details'>
							<h3>{lang === 'en' ? 'Our Showroom' : 'Наш автосалон'}</h3>
							<div className='detail-item'>
								<span className='icon'>📞</span>
								<a href='tel:+996552236611'>+(996) 552-236-611</a>
							</div>
							<div className='detail-item'>
								<span className='icon'>✉️</span>
								<a href='mailto:info@autoelite.ru'>info@autoelite.ru</a>
							</div>
							<div className='detail-item'>
								<span className='icon'>📍</span>
								<p>
									{lang === 'en'
										? 'Bishkek, Tynalieva st, 92'
										: 'Бишкек, ул. Тыналиева, 92'}
								</p>
							</div>
						</div>

						<div className='glass-card work-hours'>
							<h3>{lang === 'en' ? 'Working Hours' : 'Часы работы'}</h3>
							<p>
								<span>Пн-Пт:</span> 9:00 - 21:00
							</p>
							<p>
								<span>Сб-Вс:</span> 10:00 - 20:00
							</p>
						</div>

						<div className='social-actions'>
							<a
								href='https://wa.me/996552236611'
								target='_blank'
								rel='noopener noreferrer'
								className='social-link wa'
							>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
									alt='WA'
								/>
								WhatsApp
							</a>
							<a
								href='https://t.me/princeoftheabyss07'
								target='_blank'
								rel='noopener noreferrer'
								className='social-link tg'
							>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg'
									alt='TG'
								/>
								Telegram
							</a>
						</div>
					</div>

					<div className='contact-form-side'>
						<div className='glass-card luxury-form-card'>
							<h3>{lang === 'en' ? 'Quick Request' : 'Быстрая заявка'}</h3>
							<form
								onSubmit={handleSubmit}
								className={status === 'success' ? 'form-hidden' : ''}
							>
								{status === 'success' ? (
									<div className='success-view'>
										<div className='check-circle'>✓</div>
										<h2>{t.success[lang]}</h2>
									</div>
								) : (
									<>
										<div className='floating-input-group'>
											<input type='text' required placeholder=' ' />
											<label>{t.name[lang]}</label>
										</div>
										<div className='floating-input-group'>
											<input type='email' required placeholder=' ' />
											<label>{t.email[lang]}</label>
										</div>
										<div className='floating-input-group'>
											<textarea required placeholder=' ' rows='4'></textarea>
											<label>{t.message[lang]}</label>
										</div>
										<button
											type='submit'
											className='premium-submit-btn'
											disabled={status === 'sending'}
										>
											{status === 'sending' ? '...' : t.send[lang]}
										</button>
									</>
								)}
							</form>
						</div>
					</div>
				</div>

				<div className='glass-card map-section'>
					<MapContainer
						center={position}
						zoom={16}
						scrollWheelZoom={false}
						className='leaflet-map-frame'
					>
						<TileLayer
							attribution='&copy; CARTO'
							url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
						/>
						<Marker position={position} icon={customIcon}>
							<Popup>
								<strong>AutoElite</strong> <br />
								Бишкек, ул. Тыналиева, 92
							</Popup>
						</Marker>
					</MapContainer>
				</div>
			</div>
		</div>
	)
}

export default Contact
