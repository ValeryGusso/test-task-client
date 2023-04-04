import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/home'
import Contacts from '../pages/contacts/contacts'
import About from '../pages/about/about'
import Registration from '../pages/registration/registration'
import Login from '../pages/login/login'
import useTypedSelector from '../hooks/useTypedSelector'
import { authSelector } from '../redux/slices/auth'
import UserPage from '../pages/user/userPage'
import NotFound from '../pages/notFound/notFound'

const Router: FC = () => {
	const isAuth = useTypedSelector(authSelector).isAuth
	return (
		<Routes>
			{isAuth ? (
				<>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/about" element={<About />} />
					<Route path="/user/:id" element={<UserPage />} />
				</>
			) : (
				<>
					<Route path="/" element={<Login />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/login" element={<Login />} />
				</>
			)}
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default Router
