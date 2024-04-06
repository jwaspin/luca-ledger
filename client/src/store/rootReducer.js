import { combineReducers } from '@reduxjs/toolkit';

import { slices } from './createListSlicesFromSchemas';

export default combineReducers(
  Object.keys(slices).reduce((acc, key) => {
    console.log('combine reducers', key);
    acc[key] = slices[key].reducer;
    return acc;
  }, {})
);
