export const addTransactionReducer = (state, action) => {
  state.transactions.push(action.payload);
};

export const updateTransactionReducer = (state, action) => {
  const updatedTransaction = action.payload.transaction;
  const updatedTransactions = state.transactions.map((transaction) =>
    transaction.id === updatedTransaction.id
      ? { ...transaction, ...updatedTransaction }
      : transaction
  );
  state.transactions = updatedTransactions;
};

export const removeTransactionReducer = (state, action) => {
  const { transactionId } = action.payload;
  return state.transactions.filter(
    (transaction) => transaction.id !== transactionId
  );
};
