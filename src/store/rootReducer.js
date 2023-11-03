import { combineReducers } from '@reduxjs/toolkit';

import accountsReducer from './accounts';

export default combineReducers({
  accounts: accountsReducer,
});
