import { FC, useState } from 'react'
import cls from './registration.module.css'
import useTypedDispatch from '../../hooks/useTypedDispatch'
import { UserResponse } from '../../@types/api'
import { API } from '../../API/api'
import Input, { ErrorState } from '../../UI/input/input'
import ButtonSubmit from '../../UI/buttonSubmit/buttonSubmit'
import userImage from '../../assets/img/user.svg'
import lockImage from '../../assets/img/lock.svg'
import { authReducers } from '../../redux/slices/auth'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

const Registration: FC = () => {
	const [login, setLogin] = useState('')
	const [errorLogin, setErrorLogin] = useState<ErrorState>({ isError: false, message: '' })
	const [pass, setPass] = useState('')
	const [errorPass, setErrorPass] = useState<ErrorState>({ isError: false, message: '' })
	const [confirm, setConfirm] = useState('')
	const [errorConfirm, setErrorConfirm] = useState<ErrorState>({ isError: false, message: '' })
	const [loading, setLoading] = useState(false)
	const dispatch = useTypedDispatch()
	const navigate = useNavigate()

	function resetError() {
		setErrorLogin({ isError: false, message: '' })
		setErrorPass({ isError: false, message: '' })
		setErrorConfirm({ isError: false, message: '' })
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
			setErrorConfirm({ isError: true, message: 'Необходимо указать пароль!' })
			isValid = false
		}

		if (pass !== confirm) {
			setErrorPass({ isError: true, message: 'Пароли должны совпадать!' })
			setErrorConfirm({ isError: true, message: 'Пароли должны совпадать!' })
			isValid = false
		}

		if (!isValid) {
			return
		}
		// Request
		setLoading(true)
		API.post<UserResponse>('/auth/registration', {
			login,
			password: pass,
		})
			.then(res => {
				console.log(res)
				if (res.status === 200 && res.data.success) {
					dispatch(authReducers.setUser(res.data.user))
					localStorage.setItem('accessToken', res.data.access)
					navigate('/home')
				}
			})
			.catch((err: AxiosError<Record<string, any>>) => {
				console.log(err)
				if (err?.response?.status === 400) {
					if (err.response?.data?.message.includes('Пользователь')) {
						setErrorLogin({ isError: true, message: err.response?.data?.message })
						setErrorPass({ isError: true, message: err.response?.data?.message })
						setErrorConfirm({ isError: true, message: err.response?.data?.message })
					}
					if (err.response?.data?.message.includes('Имя')) {
						setErrorLogin({ isError: true, message: err.response?.data?.message })
					}
					if (err.response?.data?.message.includes('Пароль')) {
						setErrorPass({ isError: true, message: err.response?.data?.message })
						setErrorConfirm({ isError: true, message: err.response?.data?.message })
					}
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}
	return (
		<div className={cls.reg}>
			<p className={cls.title}>Регистрация</p>
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
				<Input
					value={confirm}
					type="password"
					placeholder="Confirm"
					tabIndex={3}
					error={errorConfirm.isError}
					errorMessage={errorConfirm.message}
					image={lockImage}
					handler={setConfirm}
					reset={resetError}
				/>
				<ButtonSubmit
					width={400}
					defaultWidth={250}
					tabIndex={4}
					handler={submit}
					prevent={true}
					fontSize={26}
					text="Sign up"
					loadingText="Loading..."
					isLoading={loading}
				/>
			</form>
			<p className={cls.info}>
				Уже есть аккаунт? <Link to="/login">Авторизоваться!</Link>
			</p>
		</div>
	)
}

export default Registration
