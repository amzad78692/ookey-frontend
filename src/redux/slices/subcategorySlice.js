import { createSlice } from '@reduxjs/toolkit';

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState: [],
  reducers: {
    setSubcategories: (state, action) => action.payload,
    addSubcategory: (state, action) => [...state, action.payload],
  },
});

export const { setSubcategories, addSubcategory } = subcategorySlice.actions;
export default subcategorySlice.reducer;
