import { combineReducers } from '@reduxjs/toolkit';

import { slices } from './createListSlicesFromSchemas';

export default combineReducers(
  Object.keys(slices).reduce((acc, key) => {
    acc[key] = slices[key].reducer;
    return acc;
  }, {})
);
