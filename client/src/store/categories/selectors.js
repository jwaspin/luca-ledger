import { createSelector } from '@reduxjs/toolkit';

export const selectCategoriesSlice = (state) => state.categories;

export const selectAllCategories = createSelector(
  selectCategoriesSlice,
  (categories) => categories.categoriesList
);

export const selectLoadedCategories = createSelector(
  selectCategoriesSlice,
  (categories) => categories.loadedList
);
