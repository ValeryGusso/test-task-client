import { FC } from 'react'
import cls from './home.module.css'

const Home: FC = () => {
	return (
		<div className={cls.home}>
			<p className={cls.title}>Главная</p>
		</div>
	)
}

export default Home
