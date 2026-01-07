import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('currentUser')) || null,
  users: JSON.parse(localStorage.getItem('registeredUsers')) || [],
  isAdmin: localStorage.getItem('isAdmin') === 'true',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('registeredUsers', JSON.stringify(state.users));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const foundUser = state.users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        state.user = foundUser;
        state.isAdmin = foundUser.role === 'admin';
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        localStorage.setItem('isAdmin', state.isAdmin.toString());
        return;
      }
      throw new Error('Неверные данные');
    },
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAdmin');
    }
  }
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;