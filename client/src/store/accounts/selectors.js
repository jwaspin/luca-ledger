import { createSelector } from '@reduxjs/toolkit';

const selectEntities = (state) => state.entities;

export const selectAllAccounts = createSelector(selectEntities, (entities) =>
  entities.entitiesList.filter((entity) => entity.entityType === 'ACCOUNT')
);
