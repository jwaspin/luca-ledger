import { createSelector } from '@reduxjs/toolkit';

const selectEntitiesSlice = (state) => state.entities;

export const selectAllEntities = createSelector(
  selectEntitiesSlice,
  (entities) => entities.entitiesList
);
