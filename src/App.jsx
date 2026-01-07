import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import About from './pages/About'
import AdminLogin from './pages/AdminLogin'
import CarDetails from './pages/CarDetails'
import Catalog from './pages/Catalog'
import Contact from './pages/Contacts'
import Garage from './pages/Garage'
import Home from './pages/Home'
import AdminDashboard from './store/AdminDashboard'

import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Profile from './profile/Profile'
import Auth from './pages/AuthPage'

const ProtectedRoute = ({ children }) => {
	const isAdmin = useSelector(state => state.auth?.isAdmin || false)
	return isAdmin ? children : <Navigate to='/admin-login' replace />
}

function App() {
	const theme = useSelector(state => state.theme?.theme || 'dark')

	useEffect(() => {
		document.body.className = theme
	}, [theme])

	return (
		<div className={`app-container ${theme}`}>
			<Header />
			<main style={{ paddingTop: '80px', minHeight: '80vh' }}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/catalog' element={<Catalog />} />
					<Route path='/catalog/:id' element={<CarDetails />} />
					<Route path='/about' element={<About />} />
					<Route path='/garage' element={<Garage />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/admin-login' element={<AdminLogin />} />
					<Route path='/auth' element={<Auth />} />
					<Route path='/profile' element={<Profile />} />
					
					<Route path='/admin/dashboard' element={<AdminDashboard />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
