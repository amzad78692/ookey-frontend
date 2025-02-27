import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  token: localStorage.getItem('token__data') || null,
  userLocation: '',
  userPincode: '',
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
    setUserPincode: (state, action) => {
      state.userPincode = action.payload.userPincode;
    },
  },
});

export const { setUser, logout, setUserLocation, setUserPincode } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth?.user;
export const selectIsLoggedIn = (state) => state.auth?.isLoggedIn;
export const selectToken = (state) => state.auth?.token;
export const selectLocation = (state) => state.auth?.userLocation;
export const selectPincode = (state) => state.auth?.userPincode;

export default authSlice.reducer;
