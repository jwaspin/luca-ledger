import { v4 as uuidv4 } from 'uuid';

import { addEntity, updateEntity } from '@/store/slices/entities.js';

export const createNewEntity = (name, description) => (dispatch) => {
  const newEntity = {
    id: uuidv4(),
    name,
    description,
    entityType: 'ACCOUNT',
    entityStatus: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dispatch(addEntity(newEntity));
};

export const updateEntityById = (id, updatedEntity) => (dispatch) => {
  dispatch(updateEntity({ id, ...updatedEntity }));
};

export const disableEntityById = (id) => (dispatch) => {
  dispatch(updateEntity({ id, entityStatus: 'INACTIVE' }));
};
