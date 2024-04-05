import { v4 as uuidv4 } from 'uuid';

import { EntityStatusEnum } from '@/store/constants';
import {
  addEntity,
  updateEntity,
  addLoadedEntities,
  updateLoadedEntity,
} from './slice';

export const createNewEntity = (type, name, description) => (dispatch) => {
  const newEntity = {
    id: uuidv4(),
    name,
    description,
    entityType: type,
    entityStatus: EntityStatusEnum.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };
  dispatch(addEntity(newEntity));
};

export const updateEntityById = (id, updatedEntity) => (dispatch) => {
  dispatch(
    updateEntity({ id, ...updatedEntity, updatedAt: new Date().toISOString() })
  );
};

export const disableEntityById = (id) => (dispatch) => {
  dispatch(updateEntity({ id, entityStatus: 'INACTIVE' }));
};

export const loadEntities = (entities) => (dispatch) => {
  dispatch(addLoadedEntities(entities));
};

export const updateLoadedEntityById = (id, updatedEntity) => (dispatch) => {
  dispatch(updateLoadedEntity({ id, ...updatedEntity }));
};

export const toggleEntitySelected = (id) => (dispatch, getState) => {
  const { loadedList } = getState().entities; // assuming the slice is named 'entities'
  const entity = loadedList.find((e) => e.id === id);

  if (entity) {
    dispatch(
      updateLoadedEntity({
        id,
        changes: { isSelected: !entity.isSelected },
      })
    );
  }
};
