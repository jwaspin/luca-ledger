import { createListSlice } from './createListSlice';
import { validators } from './validators';

const slices = {};
const allActions = {};
const allSelectors = {};

Object.keys(validators).forEach((key) => {
  const slice = createListSlice(key, validators[key]);
  slices[key] = slice;
  allActions[key] = slice.actions;
  allSelectors[key] = slice.selectors;
});

export { slices, allActions, allSelectors };
