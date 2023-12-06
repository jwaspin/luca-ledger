import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LedgerRow from '@/components/LedgerRow';
import config from '@/config';
import { constants, selectors } from '@/store/accounts';
import LedgerHeader from './LedgerHeader';
import MonthSeparatorRow from './MonthSeparatorRow';
import StatementSeparatorRow from './StatementSeparatorRow';
import { dateCompareFn } from './utils';

export default function LedgerTable({ filterValue }) {
  const { accountId } = useParams();
  const account = useSelector(selectors.selectAccountById(accountId));
  const { transactions } = account;
  const [collapsedGroups, setCollapsedGroups] = useState([]);

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

  const toggleGroupCollapse = (groupId) => {
    setCollapsedGroups((prevCollapsedGroups) =>
      prevCollapsedGroups.includes(groupId)
        ? prevCollapsedGroups.filter((id) => id !== groupId)
        : [...prevCollapsedGroups, groupId]
    );
  };

  const getMonthIdentifier = (date) => {
    return dayjs(date).format(config.monthFormatString);
  };

  const getPreviousTransaction = (index) => {
    if (index === 0) {
      return null;
    }
    return filteredTransactions[index - 1];
  };

  useEffect(() => {
    const initialCollapsedGroups = filteredTransactions
      .map((transaction) => getMonthIdentifier(transaction.date))
      .filter(
        (month, index, self) =>
          self.indexOf(month) === index &&
          ![
            getMonthIdentifier(dayjs().subtract(1, 'month')),
            getMonthIdentifier(dayjs()),
            getMonthIdentifier(dayjs().add(1, 'month')),
          ].includes(month)
      );

    setCollapsedGroups(initialCollapsedGroups);
  }, [filteredTransactions]);

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
              <MonthSeparatorRow
                transaction={transaction}
                previousTransaction={getPreviousTransaction(index)}
                isCollapsed={collapsedGroups.includes(
                  getMonthIdentifier(transaction.date)
                )}
                onToggleCollapse={() =>
                  toggleGroupCollapse(getMonthIdentifier(transaction.date))
                }
              />
              {index > 0 &&
                account.type === constants.AccountType.CREDIT_CARD && (
                  <StatementSeparatorRow
                    statementDay={account.statementDay || 1}
                    transaction={transaction}
                    previousTransaction={getPreviousTransaction(index)}
                  />
                )}
              {!collapsedGroups.includes(
                getMonthIdentifier(transaction.date)
              ) && (
                <LedgerRow
                  key={transaction.id}
                  row={transaction}
                  balance={transaction.balance}
                />
              )}
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
