import { createListSlice } from './createListSlice';
import { validators } from './validators';

export const slices = Object.keys(validators).reduce((acc, key) => {
  if (validators[key]) {
    acc[key] = createListSlice(key, validators[key]);
  } else {
    console.warn(`Validator for ${key} not found`);
  }
  return acc;
}, {});
