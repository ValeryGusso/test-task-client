import { FC, useState } from 'react'
import cls from './header.module.css'
import { menuItems } from '../../assets/constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useTypedSelector from '../../hooks/useTypedSelector'
import { authReducers, authSelector } from '../../redux/slices/auth'
import useTypedDispatch from '../../hooks/useTypedDispatch'
import { API } from '../../API/api'
import { LogoutResponse } from '../../@types/api'

const Header: FC = () => {
	const isAuth = useTypedSelector(authSelector).isAuth
	const [loading, serLoading] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useTypedDispatch()

	function click() {
		if (isAuth) {
			serLoading(true)
			API.get<LogoutResponse>('/auth/logout')
				.then(res => {
					if (res.status === 200 && res.data.success) {
						dispatch(authReducers.logout())
						localStorage.removeItem('accessToken')
						navigate('/login')
					}
				})
				.finally(() => {
					serLoading(false)
				})
		} else {
			navigate('/login')
		}
	}

	return (
		<>
			<p className={cls.logo}>LOGO</p>
			<div className={cls.menu}>
				{isAuth && (
					<ul className={cls.menu__list}>
						{menuItems.map(el => (
							<li key={el.value} className={location.pathname.includes(el.value) ? cls.active : ''}>
								<Link to={`/${el.value}`}>{el.title}</Link>
							</li>
						))}
					</ul>
				)}
				<p className={cls.login} onClick={click}>
					{isAuth ? (loading ? '...' : 'Выйти') : 'Войти'}
				</p>
			</div>
		</>
	)
}

export default Header
