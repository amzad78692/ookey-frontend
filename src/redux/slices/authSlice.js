import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  token: localStorage.getItem('token__data') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      console.log(user)
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logout } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth?.user;
export const selectIsLoggedIn = (state) => state.auth?.isLoggedIn;
export const selectToken = (state) => state.auth?.token;

export default authSlice.reducer;
