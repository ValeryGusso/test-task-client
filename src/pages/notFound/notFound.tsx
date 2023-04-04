import { FC } from 'react'
import cls from './notFound.module.css'
import { useNavigate } from 'react-router-dom'

const NotFound: FC = () => {
	const navigate = useNavigate()
	function goBack() {
		navigate(-1)
	}
	return (
		<div className={cls.notFound}>
			<p className={cls.message}>404</p>
			<p onClick={goBack} className={cls.link}>
				Вернуться
			</p>
		</div>
	)
}

export default NotFound
