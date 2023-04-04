import { FC, useRef, useState } from 'react'
import cls from './about.module.css'
import useTypedDispatch from '../../hooks/useTypedDispatch'
import Input, { ErrorState } from '../../UI/input/input'
import ButtonSubmit from '../../UI/buttonSubmit/buttonSubmit'
import userImage from '../../assets/img/user.svg'
import uploadImage from '../../assets/img/upload.svg'
import closeImage from '../../assets/img/close.svg'
import useTypedSelector from '../../hooks/useTypedSelector'
import { authReducers, authSelector } from '../../redux/slices/auth'
import { API } from '../../API/api'
import { AxiosError } from 'axios'
import { GetUserResponse } from '../../@types/api'
import { ReactSVG } from 'react-svg'

const About: FC = () => {
	const me = useTypedSelector(authSelector).user
	const [name, setName] = useState(me?.name || '')
	const [avatar, setAvatar] = useState<File | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const [errorName, setErrorName] = useState<ErrorState>({ isError: false, message: '' })
	const [about, setAbout] = useState(me?.about || '')
	const [loading, setLoading] = useState(false)
	const dispatch = useTypedDispatch()

	function submit() {
		if (name.length === 0) {
			setErrorName({ isError: true, message: 'Необходимо указать имя' })
		}

		const formData = new FormData()

		if (avatar) {
			formData.append('image', avatar, avatar.name)
		}
		if (me?.name !== name) {
			formData.append('name', name)
		}
		if (me?.about !== about) {
			formData.append('about', about)
		}

		setLoading(true)
		API.post<GetUserResponse>('/users/updateMe', formData)
			.then(res => {
				if (res.status === 200 && res.data.success) {
					dispatch(authReducers.setUser(res.data.user))
				}
			})
			.catch((err: AxiosError) => {
				setErrorName({ isError: true, message: 'Не удалось обновить пользователя!' })
			})
			.finally(() => {
				setLoading(false)
			})
	}

	function click() {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}

	function setFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			setAvatar(e.target.files[0])
		}
	}

	function reset() {
		setAvatar(null)
	}

	return (
		<div className={cls.about}>
			<input ref={inputRef} onChange={setFile} type="file" hidden={true} />
			<Input
				value={name}
				type="text"
				placeholder={'Name'}
				tabIndex={2}
				error={errorName.isError}
				errorMessage={errorName.message}
				image={userImage}
				handler={setName}
				reset={() => setErrorName({ isError: false, message: '' })}
			/>
			<textarea value={about} onChange={e => setAbout(e.target.value)}></textarea>
			<div className={cls.image}>
				<ReactSVG src={uploadImage} className={cls.upload} onClick={click} />
				{avatar && <ReactSVG src={closeImage} className={cls.close} onClick={reset} />}
				<p>{avatar?.name}</p>
			</div>
			<ButtonSubmit
				width={400}
				defaultWidth={250}
				tabIndex={3}
				handler={submit}
				prevent={true}
				fontSize={26}
				text="Обновить"
				loadingText="Идёт отправка..."
				isLoading={loading}
			/>
		</div>
	)
}

export default About
