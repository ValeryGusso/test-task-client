import { useEffect, useState } from 'react'
import Header from './components/header/header'
import Router from './components/router'
import './index.css'
import { API } from './API/api'
import { GetUserResponse, WakeupResponse } from './@types/api'
import useTypedDispatch from './hooks/useTypedDispatch'
import { authReducers } from './redux/slices/auth'
import Spinner from './UI/spinner/spinner'

function App() {
	const dispatch = useTypedDispatch()
	const [isServerUp, setIsServerUp] = useState(false)

	useEffect(() => {
		API.get<WakeupResponse>('/wakeup').then(res => {
			if (res.data.success) {
				setIsServerUp(true)
			}

			if (localStorage.getItem('accessToken')) {
				API.get<GetUserResponse>('/auth/me').then(res => {
					if (res.status == 200 && res.data.success) {
						dispatch(authReducers.setUser(res.data.user))
					}
				})
			}
		})
	}, [])

	return (
		<>
			<header>
				<Header />
			</header>
			<main>
				{isServerUp ? (
					<Router />
				) : (
					<>
						<Spinner />
						<p>
							Нужно немного подождать, пока проснётся сервер авторизации. В среднем это занимает не более 30 секунд.
						</p>
					</>
				)}
			</main>
			<footer></footer>
		</>
	)
}

export default App
