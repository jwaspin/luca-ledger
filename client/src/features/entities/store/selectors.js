import { createSelector } from '@reduxjs/toolkit';

const selectEntities = (state) => state.entities;

export const selectAllEntities = createSelector(
  selectEntities,
  (entities) => entities.entitiesList
);
