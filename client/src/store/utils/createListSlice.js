import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const createListSlice = (name, validate) => {
  const mainListAdapter = createEntityAdapter();
  const loadedListAdapter = createEntityAdapter();

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

  const addItemReducer = (state, action) => {
    const isValid = validate(action.payload);
    if (!isValid) {
      console.log('Validation failed for adding item', validate.errors);
      state.error = 'Validation failed for adding item';
      return;
    }
    state[`${name}List`].push(action.payload);
  };

  const updateItemReducer = (state, action) => {
    const { id, ...updates } = action.payload;
    const index = state[`${name}List`].findIndex((item) => item.id === id);
    if (index === -1) {
      console.log(`Item with id ${id} not found for updating`);
      state.error = `Item with id ${id} not found for updating`;
      return;
    }
    const updatedItem = { ...state[`${name}List`][index], ...updates };
    const isValid = validate(updatedItem);
    if (!isValid) {
      console.log('Validation failed for updating item', validate.errors);
      state.error = 'Validation failed for updating item';
      return;
    }
    state[`${name}List`][index] = updatedItem;
  };

  const removeItemReducer = (state, action) => {
    const id = action.payload;
    state[`${name}List`] = state[`${name}List`].filter(
      (item) => item.id !== id
    );
  };

  const addLoadedItemsReducer = (state, action) => {
    const items = action.payload;
    items.forEach((item) => {
      const isValid = validate(item);
      const validFieldsItem = Object.keys(item)
        .filter((key) =>
          Object.prototype.hasOwnProperty.call(validate.schema.properties, key)
        )
        .reduce((obj, key) => {
          obj[key] = item[key];
          return obj;
        }, {});
      const loadedItem = {
        ...validFieldsItem,
        isValid: isValid,
        isSelected: false,
      };
      const existingIndex = state.loadedList.findIndex(
        (existingItem) => existingItem.id === item.id
      );
      if (existingIndex === -1) {
        state.loadedList.push(loadedItem);
      } else {
        console.log(`Item with id ${item.id} already exists in loadedList`);
      }
    });
  };

  const updateLoadedItemReducer = (state, action) => {
    const { id, changes } = action.payload;
    const index = state.loadedList.findIndex((item) => item.id === id);
    if (index === -1) {
      console.log(`Item with id ${id} not found in loadedList`);
      return;
    }
    const itemToUpdate = state.loadedList[index];
    const updatedItem = { ...itemToUpdate, ...changes };
    const isValid = validate(updatedItem);
    state.loadedList[index] = { ...updatedItem, isValid };
  };

  const removeLoadedItemsReducer = (state, action) => {
    const idsToRemove = action.payload;
    state.loadedList = state.loadedList.filter(
      (item) => !idsToRemove.includes(item.id)
    );
  };

  const importLoadedItemsReducer = (state) => {
    const itemsToImport = state.loadedList.filter(
      (item) => item.isValid && item.isSelected
    );
    itemsToImport.forEach((item) => {
      const isValid = validate(item);
      if (isValid) {
        const existingIndex = state[`${name}List`].findIndex(
          (existingItem) => existingItem.id === item.id
        );
        if (existingIndex === -1) {
          // if item does not exist add it
          state[`${name}List`].push(item);
        } else {
          // if item exists overwrite it
          state[`${name}List`][existingIndex] = item;
        }
        state.loadedList = state.loadedList.filter((item) => !item.isSelected);
      } else {
        console.log('Validation failed for importing item', validate.errors);
        state.error = 'Validation failed for importing item';
      }
    });
  };

  return createSlice({
    name,
    initialState,
    reducers: {
      setLoading: setLoadingReducer,
      setError: setErrorReducer,
      addItem: addItemReducer,
      updateItem: updateItemReducer,
      removeItem: removeItemReducer,
      addLoadedItems: addLoadedItemsReducer,
      updateLoadedItem: updateLoadedItemReducer,
      removeLoadedItems: removeLoadedItemsReducer,
      importLoadedItems: importLoadedItemsReducer,
    },
  });
};
