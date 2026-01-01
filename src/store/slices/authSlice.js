import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAdmin: localStorage.getItem('isAdmin') === 'true',
  },
  reducers: {
    login: (state) => {
      
      state.isAdmin = true;
      localStorage.setItem('isAdmin', 'true');
    },
    logout: (state) => {
      state.isAdmin = false;
      localStorage.removeItem('isAdmin');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;