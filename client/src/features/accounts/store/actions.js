import { v4 as uuidv4 } from 'uuid';

import { addEntity, updateEntity } from '@/store/slices/entities.js';

export const createNewAccount = (name, description) => (dispatch) => {
  const newAccount = {
    id: uuidv4(),
    name,
    description,
    entityType: 'ACCOUNT',
    entityStatus: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dispatch(addEntity(newAccount));
};

export const closeAccountById = (id) => (dispatch) => {
  dispatch(updateEntity({ id, entityStatus: 'CLOSED' }));
};
