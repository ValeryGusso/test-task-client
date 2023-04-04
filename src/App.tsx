import { useEffect } from 'react'
import Header from './components/header/header'
import Router from './components/router'
import './index.css'
import { API } from './API/api'
import { GetUserResponse } from './@types/api'
import useTypedDispatch from './hooks/useTypedDispatch'
import { authReducers } from './redux/slices/auth'

function App() {
	const dispatch = useTypedDispatch()

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			API.get<GetUserResponse>('/auth/me').then(res => {
				if (res.status == 200 && res.data.success) {
					dispatch(authReducers.setUser(res.data.user))
				}
			})
		}
	}, [])

	return (
		<>
			<header>
				<Header />
			</header>
			<main>
				<Router />
			</main>
			<footer></footer>
		</>
	)
}

export default App
