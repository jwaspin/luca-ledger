import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { SchemaKeys, constants, schemas, validators } from './lucaSchemaConfig';
import { createListSlicesFromSchemas } from './schemaListSlice';

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

export { SchemaKeys, constants, schemas, slices, validators };
