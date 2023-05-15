export interface UserResponse {
	user: User
	access: string
	success: boolean
}

export interface User {
	id: number
	login: string
	password: string
	avatar: string | null
	name: string | null
	about: string | null
	createdAt: string
	updatedAt: string
}

export interface WakeupResponse {
	message: string
	success: boolean
}

export interface LogoutResponse {
	success: boolean
}

export interface GetUserResponse {
	user: User
	success: boolean
}

export interface GetAllUsersResponse {
	data: User[]
	success: boolean
}
