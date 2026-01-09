import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../Api/axios';

// 1. Загрузка списка машин
export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, { rejectWithValue }) => {
    try {
      // MockAPI возвращает массив напрямую по адресу /cars
      const res = await api.get('/cars'); 
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Добавление машины
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

// 3. Удаление машины
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
        // Твое API возвращает чистый массив
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
        // Фильтруем по ID, чтобы машина исчезла из списка сразу
        state.list = state.list.filter(car => String(car.id) !== String(action.payload));
      });
  },
});

export default carsSlice.reducer;