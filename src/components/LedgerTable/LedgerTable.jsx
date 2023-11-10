import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import PropTypes from 'prop-types';
import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LedgerRow from '@/components/LedgerRow';
import { constants, selectors } from '@/store/accounts';
import LedgerHeader from './LedgerHeader';
import MonthSeparatorRow from './MonthSeparatorRow';
import StatementSeparatorRow from './StatementSeparatorRow';
import { dateCompareFn } from './utils';

export default function LedgerTable({ filterValue }) {
  const { accountId } = useParams();
  const account = useSelector(selectors.selectAccountById(accountId));
  const { transactions } = account;

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

  const getPreviousTransaction = (index) => {
    if (index === 0) {
      return null;
    }
    return filteredTransactions[index - 1];
  };

  return (
    <TableContainer
      component={Paper}
      style={{ height: 'calc(100vh - 250px)' }}
    >
      <Table stickyHeader>
        <LedgerHeader />
        <TableBody>
          {filteredTransactions.map((transaction, index) => (
            <Fragment key={transaction.id}>
              {index > 0 &&
                account.type === constants.AccountType.CREDIT_CARD && (
                  <StatementSeparatorRow
                    statementDay={account.statementDay}
                    transaction={transaction}
                    previousTransaction={getPreviousTransaction(index)}
                  />
                )}
              <MonthSeparatorRow
                transaction={transaction}
                previousTransaction={getPreviousTransaction(index)}
              />
              <LedgerRow
                key={transaction.id}
                row={transaction}
                balance={transaction.balance}
              />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

LedgerTable.propTypes = {
  filterValue: PropTypes.string,
};
