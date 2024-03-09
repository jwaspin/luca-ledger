import { validateRepeatedTransaction } from '../validators';
import { createListSlice } from './sliceUtils';

const repeatedTransactionsSlice = createListSlice(
  'repeatedtransactions',
  validateRepeatedTransaction
);
export const {
  setLoading: setRepeatedTransactionsLoading,
  setError: setRepeatedTransactionsError,
  updateList: updateRepeatedTransactionsList,
} = repeatedTransactionsSlice.actions;
export const repeatedTransactionsReducer = repeatedTransactionsSlice.reducer;
