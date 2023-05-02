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

const findTransactionIndexById = (state, id) =>
  state.data.indexOf((transaction) => transaction.id === id);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.data.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const transactionIndex = findTransactionIndexById(
        state,
        action.payload.id
      );
      console.log('updateTransaction', transactionIndex);
      state.data[transactionIndex] = action.payload;
    },
    removeTransaction: (state, action) => {
      const transactionIndex = findTransactionIndexById(state, action.payload);
      if (transactionIndex !== -1) {
        state.data.splice(transactionIndex, 1);
      }
    },
  },
});

export const { addTransaction, removeTransaction } = transactionsSlice.actions;
export const selectTransactions = (state) => state.transactions;
export default transactionsSlice.reducer;
