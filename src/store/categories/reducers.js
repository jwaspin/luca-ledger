export const addCategoryReducer = (state, action) => {
  const categoryExists = state.some(
    (category) => category.id === action.payload.id
  );
  if (categoryExists) {
    return;
  }
  state.push(action.payload);
};

export const removeCategoryReducer = (state, action) => {
  const { payload } = action;
  return state.filter((category) => category.id !== payload);
};

export const updateCategoryReducer = (state, action) => {
  const updatedCategory = action.payload;
  const updatedCategories = state.map((category) =>
    category.id === updatedCategory.id
      ? { ...category, ...updatedCategory }
      : category
  );
  state = updatedCategories;
};
