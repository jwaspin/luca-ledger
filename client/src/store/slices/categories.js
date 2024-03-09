import { validateCategory } from '../validators';
import { createListSlice } from './sliceUtils';

const categoriesSlice = createListSlice('categories', validateCategory);
export const {
  setLoading: setCategoriesLoading,
  setError: setCategoriesError,
  updateList: updateCategoriesList,
} = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
