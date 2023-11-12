import { createSlice } from '@reduxjs/toolkit';

import {
  addCategoryReducer,
  removeCategoryReducer,
  updateCategoryReducer,
} from './reducers';

const categories = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    addCategory: addCategoryReducer,
    updateCategory: removeCategoryReducer,
    removeCategory: updateCategoryReducer,
  },
});

export default categories.reducer;

export const { addCategory, updateCategory, removeCategory } =
  categories.actions;
