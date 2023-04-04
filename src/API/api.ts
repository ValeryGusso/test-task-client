import axios from 'axios'

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL, withCredentials: true })

API.interceptors.request.use(config => {
	config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
	return config
})

API.interceptors.response.use(null, async err => {
	const originalRequest = err.config

	if (err.response.status === 401) {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/refresh`, { withCredentials: true })

		if (res.status === 200) {
			localStorage.setItem('accessToken', res.data.access)
			originalRequest.headers = { ...originalRequest.headers }
			return API.request(originalRequest)
		}
	} else {
		return Promise.reject(err)
	}
})
