import { combineReducers } from '@reduxjs/toolkit';

import { categoriesReducer } from './slices/categories';
import { entitiesReducer } from './slices/entities';
import { repeatedTransactionsReducer } from './slices/repeatedTransactions';
import { repeatedTransactionOccurrencesReducer } from './slices/repeatedTransactionOccurrences';
import { transactionsReducer } from './slices/transactions';

export default combineReducers({
  categories: categoriesReducer,
  entities: entitiesReducer,
  repeatedTransactions: repeatedTransactionsReducer,
  repeatedTransactionOccurrences: repeatedTransactionOccurrencesReducer,
  transactions: transactionsReducer,
});
