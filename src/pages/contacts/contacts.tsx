import { FC, useEffect } from 'react'
import cls from './contacts.module.css'
import useTypedDispatch from '../../hooks/useTypedDispatch'
import { fetchUsers, usersSelector } from '../../redux/slices/users'
import useTypedSelector from '../../hooks/useTypedSelector'
import User from '../../components/user/user'

const Contacts: FC = () => {
	const dispatch = useTypedDispatch()
	const { data, loading } = useTypedSelector(usersSelector)

	useEffect(() => {
		dispatch(fetchUsers())
	}, [])

	return (
		<div className={cls.contacts}>
			<p className={cls.title}>Контакты</p>
			<div className={cls.content}>
				{loading ? <div>Загружаю пользователей...</div> : data?.map(user => <User user={user} key={user.id} />)}
			</div>
		</div>
	)
}

export default Contacts
