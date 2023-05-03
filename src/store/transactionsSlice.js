import { createSlice } from '@reduxjs/toolkit';

export const TransactionStatusEnum = Object.freeze({
  PENDING: 'pending ',
  COMPLETE: 'complete ',
  SCHEDULED: 'scheduled ',
  PLANNED: 'planned ',
});

const initialState = {
  data: [],
};

const findTransactionIndexById = (transactions, id) =>
  transactions.findIndex((transaction) => transaction.id === id);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.data.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const transactionIndex = findTransactionIndexById(
        state.data,
        action.payload.id
      );
      if (transactionIndex !== -1) {
        state.data[transactionIndex] = action.payload;
      } else {
        console.log('Error updating transaction: Not Found', action.payload.id);
      }
    },
    removeTransaction: (state, action) => {
      const transactionIndex = findTransactionIndexById(
        state.data,
        action.payload
      );
      if (transactionIndex !== -1) {
        state.data.splice(transactionIndex, 1);
      } else {
        console.log('Error updating transaction: Not Found', action.payload);
      }
    },
  },
});

export const { addTransaction, updateTransaction, removeTransaction } =
  transactionsSlice.actions;
export const selectTransactions = (state) => state.transactions;
export default transactionsSlice.reducer;
