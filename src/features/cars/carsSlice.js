import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../Api/axios'

export const fetchCars = createAsyncThunk(
	'cars/fetchCars',
	async (_, { rejectWithValue }) => {
		try {
			const res = await api.get('/cars/premium/cars')
			return res.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const addCar = createAsyncThunk(
	'cars/addCar',
	async (newCar, { rejectWithValue }) => {
		try {
			const res = await api.post('/cars/premium/cars', newCar)
			return res.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const removeCar = createAsyncThunk(
	'cars/removeCar',
	async (id, { rejectWithValue }) => {
		try {
			await api.delete(`/cars/premium/cars/${id}`)
			return id
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

const carsSlice = createSlice({
	name: 'cars',
	initialState: { list: [], status: 'idle', error: null },
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCars.fulfilled, (state, action) => {
				state.list = action.payload
			})
			.addCase(addCar.fulfilled, (state, action) => {
				state.list.push(action.payload)
			})
			.addCase(removeCar.fulfilled, (state, action) => {
				state.list = state.list.filter(car => car.id !== action.payload)
			})
	},
})

export default carsSlice.reducer
