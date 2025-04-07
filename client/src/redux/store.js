import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesReducter';
import categoriesReducer from './categoriesReducter';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    categories: categoriesReducer,
  },
});

export default store;
