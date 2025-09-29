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

export const computeStatementMonth = (transaction, closingDay) => {
  const transactionDate = dayjs(transaction.date);
  return transactionDate.date() >= closingDay
    ? transactionDate.add(1, 'month').format('MMMM YYYY')
    : transactionDate.format('MMMM YYYY');
};

// Get the closing date for a given month/year combination
export const getClosingDateForMonth = (year, month, closingDay) => {
  // Create a date for the closing day of the given month/year
  // month is in "MMMM" format (e.g., "January"), so we need to convert it
  const closingDate = dayjs(`${closingDay} ${month} ${year}`, 'D MMMM YYYY');
  return closingDate.format('MMMM DD YYYY');
};

// Get the statement period dates (start and end) for a closing date
export const getStatementPeriod = (year, month, closingDay) => {
  const closingDate = dayjs(`${closingDay} ${month} ${year}`, 'D MMMM YYYY');
  const startDate = closingDate.subtract(1, 'month').add(1, 'day');

  return {
    start: startDate.format('MMMM DD YYYY'),
    end: closingDate.format('MMMM DD YYYY'),
  };
};
