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

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.data.push(action.payload);
    },
    removeTransaction: (state, action) => {
      const transactionIndex = state.data.indexOf(
        (transaction) => transaction.id === action.payload
      );
      if (transactionIndex !== -1) {
        state.data.splice(transactionIndex, 1);
      }
    },
  },
});

export const { addTransaction, removeTransaction } = transactionsSlice.actions;
export const selectTransactions = (state) => state.transactions;
export default transactionsSlice.reducer;
