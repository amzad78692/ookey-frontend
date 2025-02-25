import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  token: localStorage.getItem('token__data') || null,
  userLocation: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem('token__data', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token__data');
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload.userLocation;
    },
  },
});

export const { setUser, logout, setUserLocation } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth?.user;
export const selectIsLoggedIn = (state) => state.auth?.isLoggedIn;
export const selectToken = (state) => state.auth?.token;
export const selectLocation = (state) => state.auth?.userLocation;

export default authSlice.reducer;
