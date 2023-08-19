import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const TransactionStatusEnum = Object.freeze({
  PENDING: 'pending ',
  COMPLETE: 'complete ',
  SCHEDULED: 'scheduled ',
  PLANNED: 'planned ',
});

const initialState = {
  transactions: [],
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const updatedTransaction = action.payload;
      const updatedTransactions = state.transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      );
      state.transactions = updatedTransactions;
    },
    removeTransaction: (state, action) => {
      const transactionId = action.payload;
      return state.transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
    },
  },
});

export const { addTransaction, updateTransaction, removeTransaction } =
  transactionsSlice.actions;

const generateTransactionObject = (id, status, date, amount, description) => ({
  id,
  status,
  date,
  amount,
  description,
});

export const createNewTransaction = () =>
  generateTransactionObject(
    uuidv4(),
    TransactionStatusEnum.PLANNED,
    new Date(),
    0.0,
    ''
  );

export default transactionsSlice.reducer;
