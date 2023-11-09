import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LedgerRow from '@/components/LedgerRow';
import { selectors } from '@/store/accounts';
import LedgerHeader from './LedgerHeader';
import MonthSeparatorRow from './MonthSeparatorRow';
import StatementSeparatorRow from './StatementSeparatorRow';
import { dateCompareFn, computeStatementMonth } from './utils';

export default function LedgerTable({ filterValue }) {
  const { accountId } = useParams();
  const account = useSelector(selectors.selectAccountById(accountId));
  const { transactions } = account;

  let previousMonth = null;
  let previousStatementMonth = null;

  const sortedTransactions = useMemo(
    () => [...transactions].sort(dateCompareFn),
    [transactions]
  );

  const transactionsWithBalance = useMemo(() => {
    let currentBalance = 0.0;
    return sortedTransactions.map((transaction) => {
      currentBalance += transaction.amount;
      return { ...transaction, balance: currentBalance };
    });
  }, [sortedTransactions]);

  const filteredTransactions = useMemo(() => {
    if (!filterValue) {
      return transactionsWithBalance;
    }
    return transactionsWithBalance.filter((transaction) =>
      transaction.description.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue, transactionsWithBalance]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <LedgerHeader />
        </TableHead>
        <TableBody>
          {filteredTransactions.map((row) => {
            const transactionDate = dayjs(row.date);
            const transactionMonth = transactionDate.format('MMMM YYYY');
            const statementMonth = computeStatementMonth(row.date);

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
                  balance={row.balance}
                />
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

LedgerTable.propTypes = {
  filterValue: PropTypes.string,
};
