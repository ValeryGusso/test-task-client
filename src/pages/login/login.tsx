import { FC, useState } from 'react'
import cls from './login.module.css'
import Input, { ErrorState } from '../../UI/input/input'
import userImage from '../../assets/img/user.svg'
import lockImage from '../../assets/img/lock.svg'
import ButtonSubmit from '../../UI/buttonSubmit/buttonSubmit'
import { API } from '../../API/api'
import { UserResponse } from '../../@types/api'
import useTypedDispatch from '../../hooks/useTypedDispatch'
import { authReducers } from '../../redux/slices/auth'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

const Login: FC = () => {
	const [login, setLogin] = useState('')
	const [errorLogin, setErrorLogin] = useState<ErrorState>({ isError: false, message: '' })
	const [pass, setPass] = useState('')
	const [errorPass, setErrorPass] = useState<ErrorState>({ isError: false, message: '' })
	const [loading, setLoading] = useState(false)
	const dispatch = useTypedDispatch()
	const navigate = useNavigate()

	function resetError() {
		setErrorLogin({ isError: false, message: '' })
		setErrorPass({ isError: false, message: '' })
	}

	function submit() {
		//Prevalidation
		let isValid = true

		if (login.length === 0) {
			setErrorLogin({ isError: true, message: 'Необходимо указать логин!' })
			isValid = false
		}

		if (pass.length === 0) {
			setErrorPass({ isError: true, message: 'Необходимо указать пароль!' })
			isValid = false
		}

		if (!isValid) {
			return
		}

		// Request
		setLoading(true)

		API.post<UserResponse>('/auth/login', {
			login,
			password: pass,
		})
			.then(res => {
				if (res.status === 200 && res.data.success) {
					dispatch(authReducers.setUser(res.data.user))
					localStorage.setItem('accessToken', res.data.access)
					navigate('/home')
				}
			})
			.catch((err: AxiosError<Record<string, any>>) => {
				if (err?.response?.status === 400) {
					if (err.response.data?.message.includes('Пароль')) {
						setErrorPass({ isError: true, message: err.response.data?.message })
					}
					if (err.response.data?.message.includes('Имя')) {
						setErrorLogin({ isError: true, message: err.response.data?.message })
					}
					if (err.response.data?.message.includes('Неверно')) {
						setErrorPass({ isError: true, message: err.response.data?.message })
						setErrorLogin({ isError: true, message: err.response.data?.message })
					}
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}
	return (
		<div className={cls.auth}>
			<p className={cls.title}>Авторизация</p>
			<form action="submit">
				<Input
					value={login}
					type="text"
					placeholder="Login"
					tabIndex={1}
					error={errorLogin.isError}
					errorMessage={errorLogin.message}
					image={userImage}
					handler={setLogin}
					reset={resetError}
				/>
				<Input
					value={pass}
					type="password"
					placeholder="Password"
					tabIndex={2}
					error={errorPass.isError}
					errorMessage={errorPass.message}
					image={lockImage}
					handler={setPass}
					reset={resetError}
				/>
				<ButtonSubmit
					width={400}
					defaultWidth={250}
					tabIndex={3}
					handler={submit}
					prevent={true}
					fontSize={26}
					text="Login"
					loadingText="Loading..."
					isLoading={loading}
				/>
			</form>
			<p className={cls.info}>
				Нет акканта? <Link to="/registration">Зарегистрироваться!</Link>
			</p>
		</div>
	)
}

export default Login
