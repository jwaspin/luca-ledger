import { createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';
import { reducers, constants } from '@/store/transactions';
import { generateTransaction } from './generators';

export const createNewTransaction = (accountId) => (dispatch) => {
  const newTransaction = generateTransaction(
    uuidv4(),
    constants.TransactionStatusEnum.PLANNED,
    dayjs().format(config.dateFormatString),
    0.0,
    ''
  );
  const actionPayload = { accountId, transaction: newTransaction };
  dispatch(reducers.addTransaction(actionPayload));
};

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
        dispatch(reducers.addTransaction(firstActionPayload));

        // Create transaction for the 15th of the month
        let secondTransactionDate = nextDate.date(15);
        let secondTransaction = createNewTransaction(
          secondTransactionDate.format(config.dateFormatString)
        );
        secondTransaction.amount = amount;
        secondTransaction.description = description;

        let secondActionPayload = { accountId, transaction: secondTransaction };
        dispatch(reducers.addTransaction(secondActionPayload));

        // Advance to the next month
        nextDate = nextDate.add(1, 'month');
      } else {
        const newTransaction = createNewTransaction(
          nextDate.format(config.dateFormatString)
        );
        newTransaction.amount = amount;
        newTransaction.description = description;

        const actionPayload = { accountId, transaction: newTransaction };
        dispatch(reducers.addTransaction(actionPayload));

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

export const updateTransactionProperty =
  (accountId, transaction, property, value) => (dispatch) => {
    const updatedTransaction = {
      ...transaction,
      [property]: value,
    };
    const actionPayload = { accountId, updatedTransaction };
    dispatch(reducers.updateTransaction(actionPayload)); // Assuming you have an updateTransaction action
  };

export const removeTransaction = (accountId, transaction) => (dispatch) => {
  const actionPayload = { accountId, transactionId: transaction.id };
  dispatch(reducers.removeTransaction(actionPayload));
};
