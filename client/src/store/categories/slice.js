import { createSlice } from '@reduxjs/toolkit';

const initialCategoriesState = {
  categoriesList: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialCategoriesState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    updateCategoriesList(state, action) {
      state.categoriesList = action.payload;
    },
  },
});

export const { setLoading, setError, updateCategoriesList } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
