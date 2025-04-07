import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

const categoriesReducer = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
    state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesReducer.actions;
export default categoriesReducer.reducer;
