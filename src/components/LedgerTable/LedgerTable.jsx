import LedgerRow from '@/components/LedgerRow';
import { constants, selectors } from '@/store/accounts';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LedgerHeader from './LedgerHeader';
import MonthSeparatorRow from './MonthSeparatorRow';
import StatementSeparatorRow from './StatementSeparatorRow';
import { dateCompareFn } from './utils';

export default function LedgerTable({
  filterValue,
  collapsedGroups,
  setCollapsedGroups,
}) {
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

  const toggleGroupCollapse = (groupId) => {
    setCollapsedGroups((prevCollapsedGroups) =>
      prevCollapsedGroups.includes(groupId)
        ? prevCollapsedGroups.filter((id) => id !== groupId)
        : [...prevCollapsedGroups, groupId]
    );
  };

  const getYearIdentifier = (date) => {
    return dayjs(date).format('YYYY');
  };

  const getMonthIdentifier = (date) => {
    return dayjs(date).format('MMMM');
  };

  const getYearMonthKey = (date) => {
    return `${getYearIdentifier(date)}-${getMonthIdentifier(date)}`;
  };

  const getPreviousTransaction = (index) => {
    if (index === 0) {
      return null;
    }
    return filteredTransactions[index - 1];
  };

  const initialCollapsedGroups = useMemo(() => {
    const currentYear = dayjs().format('YYYY');
    const currentMonth = dayjs().format('MMMM');
    const nextMonth = dayjs().add(1, 'month').format('MMMM');

    const years = new Set(
      filteredTransactions.map((t) => getYearIdentifier(t.date))
    );
    const yearMonths = new Set(
      filteredTransactions.map((t) => getYearMonthKey(t.date))
    );

    return [...years, ...yearMonths].filter((group) => {
      if (group.includes('-')) {
        // Month group
        const [year, month] = group.split('-');
        if (year === currentYear) {
          return ![currentMonth, nextMonth].includes(month);
        }
        return true;
      }
      // Year group
      return group < currentYear;
    });
  }, [filteredTransactions]);

  useEffect(() => {
    setCollapsedGroups(initialCollapsedGroups);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{ overflow: 'auto', height: 'calc(100vh - 330px)' }}
    >
      <Table stickyHeader>
        <LedgerHeader />
        <TableBody>
          {filteredTransactions.map((transaction, index) => {
            const yearId = getYearIdentifier(transaction.date);
            const monthId = getMonthIdentifier(transaction.date);
            const yearMonthKey = getYearMonthKey(transaction.date);
            const previousTransaction = getPreviousTransaction(index);
            const isNewYear =
              !previousTransaction ||
              getYearIdentifier(previousTransaction.date) !== yearId;
            const isNewMonth =
              !previousTransaction ||
              getMonthIdentifier(previousTransaction.date) !== monthId;

            return (
              <Fragment key={transaction.id}>
                {isNewYear && (
                  <MonthSeparatorRow
                    transaction={transaction}
                    isYear
                    isCollapsed={collapsedGroups.includes(yearId)}
                    onToggleCollapse={() => toggleGroupCollapse(yearId)}
                  />
                )}
                {isNewMonth && !collapsedGroups.includes(yearId) && (
                  <MonthSeparatorRow
                    transaction={transaction}
                    previousTransaction={previousTransaction}
                    isCollapsed={collapsedGroups.includes(yearMonthKey)}
                    onToggleCollapse={() => toggleGroupCollapse(yearMonthKey)}
                  />
                )}
                {!collapsedGroups.includes(yearId) &&
                  !collapsedGroups.includes(yearMonthKey) && (
                    <>
                      {index > 0 &&
                        account.type === constants.AccountType.CREDIT_CARD && (
                          <StatementSeparatorRow
                            statementDay={account.statementDay || 1}
                            transaction={transaction}
                            previousTransaction={previousTransaction}
                          />
                        )}
                      <LedgerRow
                        key={transaction.id}
                        row={transaction}
                        balance={transaction.balance}
                      />
                    </>
                  )}
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
  collapsedGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCollapsedGroups: PropTypes.func.isRequired,
};
