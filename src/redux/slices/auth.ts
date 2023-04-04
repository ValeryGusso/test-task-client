import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { User } from '../../@types/api'

interface authSliceState {
	isAuth: boolean
	user: User | null
}

const initialState: authSliceState = {
	isAuth: false,
	user: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.isAuth = true
			state.user = action.payload
		},
		logout(state) {
			state.isAuth = false
			state.user = null
		},
	},
})

export const authReducers = authSlice.actions

export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer
