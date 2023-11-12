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
    removeCategory: updateCategoryReducer,
    updateCategory: removeCategoryReducer,
  },
});

export default categories.reducer;

export const { addCategory, removeCategory, updateCategory } =
  categories.actions;
