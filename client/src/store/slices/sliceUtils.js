import { createSlice } from '@reduxjs/toolkit';

export const createListSlice = (name, validate) => {
  const setLoadingReducer = (state, action) => {
    state.loading = action.payload;
  };

  const setErrorReducer = (state, action) => {
    state.error = action.payload;
  };

  const updateListReducer = (state, action) => {
    const isValid = action.payload.list.every((item) => validate(item));
    if (!isValid) {
      state.error = 'Validation failed';
      return;
    }
    state[name] = action.payload.list;
    state.error = null;
  };

  const initialState = {
    [`${name}List`]: [],
    loading: false,
    error: null,
  };

  return createSlice({
    name,
    initialState,
    reducers: {
      setLoading: setLoadingReducer,
      setError: setErrorReducer,
      updateList: updateListReducer,
    },
  });
};
