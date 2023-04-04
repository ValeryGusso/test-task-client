import { FC, MouseEvent } from 'react'
import cls from './buttonSubmit.module.css'
import classNames from 'classnames'

interface ButtonSubmitProps {
	width: number
	defaultWidth: number
	tabIndex: number
	handler: () => void
	prevent: boolean
	fontSize: number
	text: string
	loadingText: string
	isLoading: boolean
}

const ButtonSubmit: FC<ButtonSubmitProps> = ({
	width,
	defaultWidth,
	tabIndex,
	handler,
	prevent,
	fontSize,
	text,
	loadingText,
	isLoading,
}) => {
	function click(e: MouseEvent<HTMLButtonElement>) {
		if (prevent) {
			e.preventDefault()
		}
		if (isLoading) {
			return
		}
		handler()
	}

	return (
		<div
			className={classNames({ [cls.container]: true, [cls.loading]: isLoading })}
			style={{ '--w': width + 'px', '--d': defaultWidth + 'px' } as React.CSSProperties}
		>
			<button onClick={click} style={{ '--fsz': fontSize + 'px' } as React.CSSProperties} tabIndex={tabIndex}>
				{isLoading ? loadingText : text}
			</button>
		</div>
	)
}

export default ButtonSubmit
