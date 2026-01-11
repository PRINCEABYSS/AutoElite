import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../Api/axios';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, { rejectWithValue }) => {
    try {
     
      const res = await api.get('/cars'); 
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addCar = createAsyncThunk(
  'cars/addCar',
  async (newCar, { rejectWithValue }) => {
    try {
      const res = await api.post('/cars', newCar);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeCar = createAsyncThunk(
  'cars/removeCar',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/cars/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: { 
    list: [], 
    status: 'idle', 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(removeCar.fulfilled, (state, action) => {
   
        state.list = state.list.filter(car => String(car.id) !== String(action.payload));
      });
  },
});

export default carsSlice.reducer;