import { createSlice } from '@reduxjs/toolkit';

import {
  addTransactionReducer,
  removeTransactionReducer,
  updateTransactionReducer,
} from './reducers';

export const transactions = createSlice({
  name: 'transactions',
  reducers: {
    addTransaction: addTransactionReducer,
    updateTransaction: updateTransactionReducer,
    removeTransaction: removeTransactionReducer,
  },
});

export default transactions.reducer;

export const { addTransaction, updateTransaction, removeTransaction } =
  transactions.actions;
