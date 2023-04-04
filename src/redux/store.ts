import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth'
import usersSlice from './slices/users'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		users: usersSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type TypeDispatch = typeof store.dispatch
