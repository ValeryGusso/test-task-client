import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { GetAllUsersResponse, User } from '../../@types/api'
import { API } from '../../API/api'

interface UsersSliceState {
	status: 'pending' | 'fullfiled' | 'error' | 'init'
	loading: boolean
	data: User[] | null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const { data } = await API.get<GetAllUsersResponse>('/users/all')
	return data
})

const initialState: UsersSliceState = {
	status: 'init',
	loading: false,
	data: null,
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchUsers.pending, state => {
			state.loading = true
			state.status = 'pending'
			state.data = null
		})
		builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<GetAllUsersResponse>) => {
			state.loading = false
			state.status = 'fullfiled'
			state.data = action.payload.data
		})
		builder.addCase(fetchUsers.rejected, state => {
			state.loading = false
			state.status = 'error'
			state.data = null
		})
	},
})

export const authReducers = usersSlice.actions

export const usersSelector = (state: RootState) => state.users

export default usersSlice.reducer
