import { FC } from 'react'
import cls from './user.module.css'
import { User } from '../../@types/api'
import defaultAvatar from '../../assets/img/default_avatar.jpg'
import { useNavigate } from 'react-router-dom'

interface UserProps {
	user: User
}

const UserBlock: FC<UserProps> = ({ user }) => {
	const navigate = useNavigate()
	function click() {
		navigate(`/user/${user.id}`)
	}
	return (
		<div className={cls.user}>
			<div onClick={click} className={cls.profile}>
				<img src={user.avatar || defaultAvatar} alt="avatar" draggable={false} />
				<p>{user.login}</p>
			</div>
			<div className={cls.info}>
				<p>{user.name} :</p>
				<p>{user.about}</p>
			</div>
		</div>
	)
}

export default UserBlock
