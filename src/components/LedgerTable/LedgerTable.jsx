import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import dayjs from 'dayjs';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import config from '@/config';
import { selectAccountById } from '@/store/accountsSlice';
import LedgerHeader from './LedgerHeader';
import LedgerRow from './LedgerRow';
import MonthSeparatorRow from './MonthSeparatorRow';
import StatementSeparatorRow from './StatementSeparatorRow';

const dateCompareFn = (a, b) => {
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

export default function LedgerTable() {
  const { accountId } = useParams();
  const account = useSelector(selectAccountById(accountId));
  const { transactions } = account;

  let currentBalance = 0.0;
  let previousMonth = null;
  let previousStatementMonth = null;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <LedgerHeader />
        </TableHead>
        <TableBody>
          {[...transactions].sort(dateCompareFn).map((row) => {
            currentBalance += parseFloat(row.amount);
            const transactionDate = dayjs(row.date);
            const transactionMonth = transactionDate.format('MMMM YYYY');
            const statementMonth =
              transactionDate.date() >= account.statementDay
                ? transactionDate.add(1, 'month').format('MMMM YYYY')
                : transactionDate.format('MMMM YYYY');

            let monthSeparator = null;
            if (transactionMonth !== previousMonth) {
              previousMonth = transactionMonth;
              monthSeparator = (
                <MonthSeparatorRow transactionMonth={transactionMonth} />
              );
            }

            let statementSeparator = null;
            if (statementMonth !== previousStatementMonth) {
              const statementDate = dayjs(
                `${account.statementDay} ${previousStatementMonth}`,
                'D MMMM YYYY'
              ).format('MMMM DD YYYY');
              previousStatementMonth = statementMonth;
              statementSeparator = (
                <StatementSeparatorRow statementDate={statementDate} />
              );
            }

            return (
              <Fragment key={row.id}>
                {statementSeparator}
                {monthSeparator}
                <LedgerRow
                  key={row.id}
                  row={row}
                  balance={currentBalance}
                />
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
