import dayjs from 'dayjs';

import config from '@/config';

export const dateCompareFn = (a, b) => {
  const aDate = dayjs(a.date).format(config.compareDateFormatString);
  const bDate = dayjs(b.date).format(config.compareDateFormatString);
  if (aDate < bDate) {
    return -1;
  }
  if (aDate > bDate) {
    return 1;
  }
  return 0;
};

export const computeStatementMonth = (transaction, statementDay) => {
  const transactionDate = dayjs(transaction.date);
  return transactionDate.date() >= statementDay
    ? transactionDate.add(1, 'month').format('MMMM YYYY')
    : transactionDate.format('MMMM YYYY');
};

// Get the month that a statement separator should be displayed under
export const getStatementDisplayMonth = (statementMonth) => {
  // The statement separator should appear under the same month as the statement month
  // For example, "Statement November 15" should appear under "November 2024"
  return statementMonth;
};
