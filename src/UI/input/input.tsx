import { FC, useState, useRef, ChangeEvent, useEffect } from 'react'
import cls from './input.module.css'
import eyeOn from '../../assets/img/eye_1.svg'
import eyeOff from '../../assets/img/eye_off.svg'
import classNames from 'classnames'
import { ReactSVG } from 'react-svg'

interface InputProps {
	value: string
	type: 'text' | 'password'
	placeholder: string
	tabIndex: number
	error: boolean
	errorMessage: string
	image: string
	handler: React.Dispatch<React.SetStateAction<string>>
	reset: () => void
}

export interface ErrorState {
	isError: boolean
	message: string
}

const Input: FC<InputProps> = ({ value, type, placeholder, tabIndex, error, errorMessage, image, handler, reset }) => {
	const [showPass, setShowPass] = useState(false)
	const [active, setActive] = useState(false)
	const onFocus = useRef(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (value) {
			setActive(true)
		}
	}, [])

	function change(e: ChangeEvent<HTMLInputElement>) {
		handler(e.target.value)
	}

	function click() {
		if (!active && inputRef.current) {
			inputRef.current.focus()
		} else {
			setActive(true)
		}
	}
	function focus() {
		setActive(true)
		if (error) {
			reset()
		}
	}
	function blur() {
		if (!active || !value) {
			setActive(false)
		}
		if (onFocus.current) {
			setActive(true)
		}
	}
	function changeType() {
		setShowPass(prev => !prev)
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	return (
		<div
			className={cls.container}
			onClick={click}
			onMouseEnter={() => (onFocus.current = true)}
			onMouseLeave={() => (onFocus.current = false)}
		>
			<input
				onChange={change}
				onFocus={focus}
				onBlur={blur}
				value={value}
				ref={inputRef}
				className={classNames({
					[cls.focus]: active,
					[cls.input__error]: error,
					[cls.addPadding]: type === 'password',
				})}
				type={showPass && type === 'password' ? 'text' : type}
				tabIndex={tabIndex}
			/>
			<div className={classNames({ [cls.icon]: true, [cls.svg__active]: active })}>
				<ReactSVG src={image} />
			</div>
			{type === 'password' && (
				<div onClick={changeType} className={classNames({ [cls.eye]: true, [cls.svg__active]: active })}>
					<ReactSVG src={showPass ? eyeOff : eyeOn} />
				</div>
			)}
			<p className={classNames({ [cls.placeholder]: true, [cls.active]: active })}>{placeholder}</p>
			{error && <p className={classNames({ [cls.error]: true })}>{errorMessage}</p>}
		</div>
	)
}

export default Input
