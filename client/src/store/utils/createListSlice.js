import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { createMainListReducers } from './createMainListReducers';
import { createLoadedListReducers } from './createLoadedListReducers';

export const createListSlice = (name, validate) => {
  const mainListAdapter = createEntityAdapter();
  const loadedListAdapter = createEntityAdapter();

  const mainListReducers = createMainListReducers(mainListAdapter, validate);
  const loadedListReducers = createLoadedListReducers(
    loadedListAdapter,
    validate
  );

  const initialState = {
    mainList: mainListAdapter.getInitialState(),
    loadedList: loadedListAdapter.getInitialState(),
    loading: false,
    error: null,
  };

  const setLoadingReducer = (state, action) => {
    state.loading = action.payload;
  };

  const setErrorReducer = (state, action) => {
    state.error = action.payload;
  };

  const importLoadedItemReducer = (state, action) => {
    const id = action.payload;
    const item = state.loadedList.entities[id];
    if (item && item.isValid && item.isSelected) {
      mainListAdapter.addOne(state.mainList, item);
      loadedListAdapter.removeOne(state.loadedList, id);
    }
  };

  const importLoadedItemsReducer = (state) => {
    const itemsToImport = Object.values(state.loadedList.entities).filter(
      (item) => item.isSelected && item.isValid
    );
    itemsToImport.forEach((item) => {
      mainListAdapter.addOne(state.mainList, item);
      loadedListAdapter.removeOne(state.loadedList, item.id);
    });
  };

  const reducers = {
    setLoading: setLoadingReducer,
    setError: setErrorReducer,
    importLoadedItem: importLoadedItemReducer,
    importLoadedItems: importLoadedItemsReducer,
    ...mainListReducers,
    ...loadedListReducers,
  };

  return createSlice({
    name,
    initialState,
    reducers,
  });
};
