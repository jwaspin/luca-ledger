import { v4 as uuidv4 } from 'uuid';

import { addEntity } from '@/store/slices/entities.js';

export const createNewAccount = (name, description) => (dispatch) => {
  const newAccount = {
    id: uuidv4(),
    name,
    description,
    entityType: 'ACCOUNT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dispatch(addEntity(newAccount));
};
