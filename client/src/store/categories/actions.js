import { v4 as uuidv4 } from 'uuid';

import { addCategory, updateCategory, addLoadedCategories } from './slice';

// ToDo: this function is not done
export const createNewCategory = (name, description) => (dispatch) => {
  const newCategory = {
    id: uuidv4(),
    name,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };
  dispatch(addCategory(newCategory));
};

export const updateCategoryById = (id, updatedCategory) => (dispatch) => {
  dispatch(
    updateCategory({
      id,
      ...updatedCategory,
      updatedAt: new Date().toISOString(),
    })
  );
};

export const loadCategories = (categories) => (dispatch) => {
  dispatch(addLoadedCategories(categories));
};
