import { FC, useEffect, useState } from 'react'
import cls from './userPage.module.css'
import { GetUserResponse, User } from '../../@types/api'
import { useParams } from 'react-router-dom'
import { API } from '../../API/api'
import defaultAfatar from '../../assets/img/default_avatar.jpg'

const UserPage: FC = () => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [loadingError, setLoadingError] = useState(false)
	const params = useParams()

	useEffect(() => {
		API.get<GetUserResponse>(`/users/byId/${params.id}`)
			.then(res => {
				if (res.status === 200 && res.data.success) {
					setUser(res.data.user)
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}, [params.id])

	return (
		<div>
			{loading ? (
				<div>Загружаю пользователя</div>
			) : user ? (
				<div className={cls.user}>
					<div className={cls.profile}>
						<img
							src={loadingError ? defaultAfatar : user.avatar || defaultAfatar}
							alt="avatar"
							onError={() => setLoadingError(true)}
						/>
						<p>{user.login}</p>
					</div>
					<div className={cls.info}>
						<p>{user.name} :</p>
						<p>{user.about}</p>
					</div>
				</div>
			) : (
				'При загрузке произошла ошибка!'
			)}
		</div>
	)
}

export default UserPage
