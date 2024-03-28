import { createSelector } from '@reduxjs/toolkit';

const selectTransactionsSlice = (state) => state.transactions;
const selectEntitiesSlice = (state) => state.entities;

export const selectAllTransactions = createSelector(
  selectTransactionsSlice,
  (transactions) => transactions.transactionsList
);

export const selectTransactionsByAccountId = (accountId) =>
  createSelector(selectTransactionsSlice, (transactions) =>
    transactions.transactionsList.filter(
      (transaction) =>
        transaction.payorId === accountId || transaction.payeeId === accountId
    )
  );

export const selectAllEntities = createSelector(
  selectEntitiesSlice,
  (entities) => entities.entitiesList
);

export const selectEntityById = (entityId) =>
  createSelector(selectEntitiesSlice, (entities) =>
    entities.entitiesList.find((entity) => entity.id === entityId)
  );
