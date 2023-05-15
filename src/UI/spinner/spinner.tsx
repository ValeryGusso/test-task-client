import { FC } from 'react'
import cls from './spinner.module.css'

const Spinner: FC = () => {
	return (
		<div className={cls.spinner}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Spinner
