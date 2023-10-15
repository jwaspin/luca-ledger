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
      const { transactionId } = action.payload;
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
    const startDay = dayjs(startDate).date();
    let nextDate = dayjs(startDate);

    for (let i = 0; i < occurrences; i++) {
      if (frequency === 'Bi-Monthly') {
        // Create transaction for the 1st of the month
        let firstTransactionDate = nextDate.date(1);
        let firstTransaction = createNewTransaction(
          firstTransactionDate.format(config.dateFormatString)
        );
        firstTransaction.amount = amount;
        firstTransaction.description = description;

        let firstActionPayload = { accountId, transaction: firstTransaction };
        dispatch(addTransaction(firstActionPayload));

        // Create transaction for the 15th of the month
        let secondTransactionDate = nextDate.date(15);
        let secondTransaction = createNewTransaction(
          secondTransactionDate.format(config.dateFormatString)
        );
        secondTransaction.amount = amount;
        secondTransaction.description = description;

        let secondActionPayload = { accountId, transaction: secondTransaction };
        dispatch(addTransaction(secondActionPayload));

        // Advance to the next month
        nextDate = nextDate.add(1, 'month');
      } else {
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
          const nextMonth = nextDate.add(frequencyCount, 'month');
          const nextMonthDays = nextMonth.daysInMonth();
          let nextDay = startDay;
          if (startDay > nextMonthDays) {
            nextDay = nextMonthDays;
          }
          nextDate = nextMonth.date(nextDay);
        } else if (frequency === 'Years') {
          nextDate = nextDate.add(frequencyCount, 'year');
        }
      }
    }
  }
);
