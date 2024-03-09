import { validateRepeatedTransactionOccurrence } from '../validators';
import { createListSlice } from './sliceUtils';

const repeatedTransactionOccurrencesSlice = createListSlice(
  'repeatedtransactionoccurrences',
  validateRepeatedTransactionOccurrence
);
export const {
  setLoading: setRepeatedTransactionOccurrencesLoading,
  setError: setRepeatedTransactionOccurrencesError,
  addItem: addRepeatedTransactionOccurrence,
  updateItem: updateRepeatedTransactionOccurrence,
  removeItem: removeRepeatedTransactionOccurrence,
} = repeatedTransactionOccurrencesSlice.actions;
export const repeatedTransactionOccurrencesReducer =
  repeatedTransactionOccurrencesSlice.reducer;
