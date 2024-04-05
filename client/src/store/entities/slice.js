import { validateEntity } from '../validators';
import { createListSlice } from '../utils/createListSlice';

const entitiesSlice = createListSlice('entities', validateEntity);
export const {
  setLoading: setEntitiesLoading,
  setError: setEntitiesError,
  addItem: addEntity,
  updateItem: updateEntity,
  removeItem: removeEntity,
  addLoadedItems: addLoadedEntities,
  updateLoadedItem: updateLoadedEntity,
  removeLoadedItems: removeLoadedEntities,
  importLoadedItems: importEntities,
} = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
