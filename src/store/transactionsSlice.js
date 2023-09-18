import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';

export const TransactionStatusEnum = Object.freeze({
  PENDING: 'pending ',
  COMPLETE: 'complete ',
  SCHEDULED: 'scheduled ',
  PLANNED: 'planned ',
});

export const transactionsSlice = createSlice({
  name: 'transactions',
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const updatedTransaction = action.payload.transaction;
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

export const createNewTransaction = (date = null) =>
  generateTransactionObject(
    uuidv4(),
    TransactionStatusEnum.PLANNED,
    date || dayjs().format(config.dateFormatString),
    0.0,
    ''
  );

export const createRepeatTransaction = createAsyncThunk(
  'transactions/createRepeat',
  async (
    {
      startDate,
      amount,
      description,
      frequency,
      frequencyCount,
      occurrences,
      accountId,
    },
    { dispatch }
  ) => {
    let nextDate = dayjs(startDate);

    for (let i = 0; i < occurrences; i++) {
      const newTransaction = createNewTransaction(
        nextDate.format(config.dateFormatString)
      );
      newTransaction.amount = amount;
      newTransaction.description = description;

      const actionPayload = { accountId, transaction: newTransaction };
      dispatch(addTransaction(actionPayload));

      if (frequency === 'Days') {
        nextDate = nextDate.add(frequencyCount, 'day');
      } else if (frequency === 'Weeks') {
        nextDate = nextDate.add(frequencyCount, 'week');
      } else if (frequency === 'Months') {
        nextDate = nextDate.add(frequencyCount, 'month');
      } else if (frequency === 'Years') {
        nextDate = nextDate.add(frequencyCount, 'year');
      } else if (frequency === 'Bi-Monthly') {
        nextDate = nextDate.add(frequencyCount * 2, 'month');
      }
    }
  }
);
