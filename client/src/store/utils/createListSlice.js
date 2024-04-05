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

  const addMainItemReducer = (state, action) => {
    const item = action.payload;
    const isValid = validate(item);
    if (isValid) {
      mainListAdapter.addOne(state.mainList, item);
    } else {
      state.error = `Validation failed for adding item: ${validate.errors.map((err) => err.message).join(', ')}`;
    }
  };

  const addMainItemsReducer = (state, action) => {
    const items = action.payload;
    const validItems = [];
    let errorMessages = [];
    items.forEach((item) => {
      const isValid = validate(item);
      if (isValid) {
        validItems.push(item);
      } else {
        const itemErrors = validate.errors.map(
          (err) => `${err.instancePath} ${err.message}`
        );
        errorMessages = errorMessages.concat(itemErrors);
      }
    });
    if (validItems.length) {
      mainListAdapter.addMany(state.mainList, validItems);
    }
    if (errorMessages.length) {
      state.error = `Validation failed for adding items: ${errorMessages.join(', ')}`;
    }
  };

  const updateMainItemReducer = (state, action) => {
    const { id, changes } = action.payload;
    const item = state.mainList.entities[id];
    if (!item) {
      state.error = `Item with id ${id} not found for updating`;
      return;
    }
    const updatedItem = { ...item, ...changes };
    const isValid = validate(updatedItem);
    if (isValid) {
      mainListAdapter.updateOne(state.mainList, { id, changes });
    } else {
      state.error = `Validation failed for updating item: ${validate.errors.map((err) => err.message).join(', ')}`;
    }
  };

  const updateMainItemsReducer = (state, action) => {
    const updates = action.payload; // Assuming this is an array of objects with { id, changes }
    const errorMessages = [];
    updates.forEach((update) => {
      const item = state.mainList.entities[update.id];
      if (!item) {
        errorMessages.push(`Item with id ${update.id} not found for updating`);
        return;
      }
      const updatedItem = { ...item, ...update.changes };
      const isValid = validate(updatedItem);
      if (!isValid) {
        errorMessages.push(
          `Validation failed for item with id ${update.id}: ${validate.errors.map((err) => err.message).join(', ')}`
        );
        return;
      }
      mainListAdapter.updateOne(state.mainList, update);
    });
    if (errorMessages.length) {
      state.error = `Update errors: ${errorMessages.join('; ')}`;
    }
  };

  const removeMainItemReducer = (state, action) => {
    const id = action.payload;
    mainListAdapter.removeOne(state.mainList, id);
  };

  const removeMainItemsReducer = (state, action) => {
    const ids = action.payload;
    mainListAdapter.removeMany(state.mainList, ids);
  };

  const addLoadedItemReducer = (state, action) => {
    const item = action.payload;
    const isValid = validate(item);
    const itemWithValidity = {
      ...item,
      isValid,
      validationErrors: isValid ? null : validate.errors,
    };
    loadedListAdapter.addOne(state.loadedList, itemWithValidity);
  };

  const addLoadedItemsReducer = (state, action) => {
    const items = action.payload;
    items.forEach((item) => {
      const isValid = validate(item);
      loadedListAdapter.addOne(state.loadedList, {
        ...item,
        isValid,
        validationErrors: isValid ? null : validate.errors,
      });
    });
  };

  const updateLoadedItemReducer = (state, action) => {
    const { id, changes } = action.payload;
    const item = state.loadedList.entities[id];
    if (item) {
      const updatedItem = { ...item, ...changes };
      const isValid = validate(updatedItem);
      loadedListAdapter.updateOne(state.loadedList, {
        id,
        changes: {
          ...changes,
          isValid,
          validationErrors: isValid ? null : validate.errors,
        },
      });
    }
  };

  const updateLoadedItemsReducer = (state, action) => {
    const updates = action.payload;
    updates.forEach((update) => {
      const item = state.loadedList.entities[update.id];
      if (item) {
        const updatedItem = { ...item, ...update.changes };
        const isValid = validate(updatedItem);
        loadedListAdapter.updateOne(state.loadedList, {
          id: update.id,
          changes: {
            ...update.changes,
            isValid,
            validationErrors: isValid ? null : validate.errors,
          },
        });
      }
    });
  };

  const removeLoadedItemReducer = (state, action) => {
    const id = action.payload;
    loadedListAdapter.removeOne(state.loadedList, id);
  };

  const removeLoadedItemsReducer = (state, action) => {
    const ids = action.payload;
    loadedListAdapter.removeMany(state.loadedList, ids);
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

  return createSlice({
    name,
    initialState,
    reducers: {
      setLoading: setLoadingReducer,
      setError: setErrorReducer,
      addMainItem: addMainItemReducer,
      addMainItems: addMainItemsReducer,
      updateMainItem: updateMainItemReducer,
      updateMainItems: updateMainItemsReducer,
      removeMainItem: removeMainItemReducer,
      removeMainItems: removeMainItemsReducer,
      addLoadedItem: addLoadedItemReducer,
      addLoadedItems: addLoadedItemsReducer,
      updateLoadedItem: updateLoadedItemReducer,
      updateLoadedItems: updateLoadedItemsReducer,
      removeLoadedItem: removeLoadedItemReducer,
      removeLoadedItems: removeLoadedItemsReducer,
      importLoadedItem: importLoadedItemReducer,
      importLoadedItems: importLoadedItemsReducer,
    },
  });
};
