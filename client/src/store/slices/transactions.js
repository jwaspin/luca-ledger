import { validateTransaction } from '../validators';
import { createListSlice } from './sliceUtils';

const transactionsSlice = createListSlice('transactions', validateTransaction);
export const {
  setLoading: setTransactionsLoading,
  setError: setTransactionsError,
  addItem: addTransaction,
  updateItem: updateTransaction,
  removeItem: removeTransaction,
} = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
