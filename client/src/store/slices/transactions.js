import { validateTransaction } from '../validators';
import { createListSlice } from './sliceUtils';

const transactionsSlice = createListSlice('transactions', validateTransaction);
export const {
  setLoading: setTransactionsLoading,
  setError: setTransactionsError,
  updateList: updateTransactionsList,
} = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
