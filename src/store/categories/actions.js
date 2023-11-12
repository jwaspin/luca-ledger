import { generateCategory } from './generators';
import { addCategory } from './slice';

export const createNewCategory = (initialData) => (dispatch) => {
  dispatch(addCategory(generateCategory(initialData)));
};

export const loadCategory = (category) => (dispatch) => {
  dispatch(addCategory(generateCategory(category)));
};
