import { validateEntity } from '../validators';
import { createListSlice } from './sliceUtils';

const entitiesSlice = createListSlice('entities', validateEntity);
export const {
  setLoading: setEntitiesLoading,
  setError: setEntitiesError,
  updateList: updateEntitiesList,
} = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
