import { combineReducers } from '@reduxjs/toolkit';

import { categoriesReducer } from './slices/categories';
import { entitiesReducer } from './slices/entities';
import { recurringTransactionsReducer } from './slices/recurringTransactions';
import { recurringTransactionEventsReducer } from './slices/recurringTransactionEvents';
import { transactionsReducer } from './slices/transactions';

export default combineReducers({
  categories: categoriesReducer,
  entities: entitiesReducer,
  recurringTransactions: recurringTransactionsReducer,
  recurringTransactionEvents: recurringTransactionEventsReducer,
  transactions: transactionsReducer,
});
