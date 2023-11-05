import { reducers } from '@/store/transactions';

export const addAccountReducer = (state, action) => {
  state.push(action.payload);
};

export const updateAccountReducer = (state, action) => {
  const updatedAccount = action.payload;
  const accountIndex = state.findIndex(
    (account) => account.id === updatedAccount.id
  );
  if (accountIndex !== -1) {
    state[accountIndex] = updatedAccount;
  }
};

export const removeAccountReducer = (state, action) => {
  const accountId = action.payload;
  return state.filter((account) => account.id !== accountId);
};

export const extraReducers = (builder) => {
  builder.addCase(reducers.addTransaction, (state, action) => {
    const { accountId, transaction } = action.payload;
    const accountIndex = state.findIndex((account) => account.id === accountId);
    if (accountIndex !== -1) {
      state[accountIndex].transactions.push(transaction);
    }
  });
  builder.addCase(reducers.updateTransaction, (state, action) => {
    const { accountId, transaction } = action.payload;
    const accountIndex = state.findIndex((account) => account.id === accountId);
    if (accountIndex !== -1) {
      const transactionIndex = state[accountIndex].transactions.findIndex(
        (t) => t.id === transaction.id
      );
      if (transactionIndex !== -1) {
        state[accountIndex].transactions[transactionIndex] = transaction;
      }
    }
  });
  builder.addCase(reducers.removeTransaction, (state, action) => {
    const { accountId, transactionId } = action.payload;
    const accountIndex = state.findIndex((account) => account.id === accountId);
    if (accountIndex !== -1) {
      state[accountIndex].transactions = state[
        accountIndex
      ].transactions.filter((t) => t.id !== transactionId);
    }
  });
};
