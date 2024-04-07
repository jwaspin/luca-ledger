import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { SchemaKeys, validators } from './lucaSchema';
import { createListSlicesFromSchemas } from './schemaDrivenSlice';

const slices = createListSlicesFromSchemas(SchemaKeys, validators);

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  return result;
};

const rootReducer = combineReducers(
  Object.values(SchemaKeys).reduce((acc, schemaKey) => {
    if (slices[schemaKey]) {
      acc[schemaKey] = slices[schemaKey];
    }
    return acc;
  }, {})
);

export default configureStore({
  reducer: rootReducer,
  preloadedState: JSON.parse(localStorage.getItem('reduxState')) || {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export { slices };
