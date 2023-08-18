import { configureStore } from '@reduxjs/toolkit';

import accountsReducer from './accountsSlice';
import transactionsReducer from './transactionsSlice';

export default configureStore({
  reducer: {
    accounts: accountsReducer,
    transactions: transactionsReducer,
  },
});
