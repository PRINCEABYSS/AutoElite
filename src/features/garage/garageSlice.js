import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: JSON.parse(localStorage.getItem("garage")) || [],
};

const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    addToGarage(state, action) {
      const exists = state.cars.some(car => car.id === action.payload.id);
      if (!exists) {
        state.cars.push(action.payload);
        localStorage.setItem("garage", JSON.stringify(state.cars));
      }
    },
    removeFromGarage(state, action) {
      state.cars = state.cars.filter(car => car.id !== action.payload);
      localStorage.setItem("garage", JSON.stringify(state.cars));
    },
  },
});

export const { addToGarage, removeFromGarage } = garageSlice.actions;
export default garageSlice.reducer;