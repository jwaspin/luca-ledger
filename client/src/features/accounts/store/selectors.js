import { createSelector } from '@reduxjs/toolkit';

const selectEntitiesSlice = (state) => state.entities;

export const selectAllAccounts = createSelector(
  selectEntitiesSlice,
  (entities) =>
    entities.entitiesList.filter((entity) => entity.entityType === 'ACCOUNT')
);
