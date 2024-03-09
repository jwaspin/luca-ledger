import { validateRepeatedTransactionOccurrence } from '../validators';
import { createListSlice } from './sliceUtils';

const repeatedTransactionOccurrencesSlice = createListSlice(
  'repeatedtransactionoccurrences',
  validateRepeatedTransactionOccurrence
);
export const {
  setLoading: setRepeatedTransactionOccurrencesLoading,
  setError: setRepeatedTransactionOccurrencesError,
  updateList: updateRepeatedTransactionOccurrencesList,
} = repeatedTransactionOccurrencesSlice.actions;
export const repeatedTransactionOccurrencesReducer =
  repeatedTransactionOccurrencesSlice.reducer;
