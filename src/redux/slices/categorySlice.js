import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: [],
  reducers: {
    setCategories: (state, action) => action.payload,
    addCategory: (state, action) => [...state, action.payload],
  },
});

export const { setCategories, addCategory } = categorySlice.actions;
export default categorySlice.reducer;
