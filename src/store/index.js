import { configureStore } from '@reduxjs/toolkit';

import accountsReducer from './accountsSlice';

export default configureStore({
  reducer: {
    accounts: accountsReducer,
  },
});
