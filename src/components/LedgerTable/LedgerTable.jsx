import LedgerRow from '@/components/LedgerRow';
import { constants, selectors } from '@/store/accounts';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Fragment, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LedgerHeader from './LedgerHeader';
import SeparatorRow from './SeparatorRow';
import StatementSeparatorRow from './StatementSeparatorRow';
import {
  dateCompareFn,
  computeStatementMonth,
  getStatementDisplayMonth,
} from './utils';

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
    }, []);
  }, [sortedTransactions]);

  const filteredTransactions = useMemo(() => {
    if (!filterValue) {
      return transactionsWithBalance;
    }
    return transactionsWithBalance.filter((transaction) =>
      transaction.description.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue, transactionsWithBalance]);

  // Calculate statement separators for credit card accounts
  const statementSeparatorsByMonth = useMemo(() => {
    if (account.type !== constants.AccountType.CREDIT_CARD) {
      return {};
    }

    const separators = {};
    const statementDay = account.statementDay || 1;
    const seenStatementMonths = new Set();

    filteredTransactions.forEach((transaction, index) => {
      if (index === 0) return; // Skip first transaction

      const previousTransaction = filteredTransactions[index - 1];
      const currentStatementMonth = computeStatementMonth(
        transaction,
        statementDay
      );
      const previousStatementMonth = computeStatementMonth(
        previousTransaction,
        statementDay
      );

      if (
        currentStatementMonth !== previousStatementMonth &&
        !seenStatementMonths.has(previousStatementMonth)
      ) {
        seenStatementMonths.add(previousStatementMonth);

        // Determine which month section this separator should appear under
        const displayMonth = getStatementDisplayMonth(previousStatementMonth);

        if (!separators[displayMonth]) {
          separators[displayMonth] = [];
        }

        separators[displayMonth].push({
          statementMonth: previousStatementMonth,
          statementDay: statementDay,
        });
      }
    });

    return separators;
  }, [filteredTransactions, account.type, account.statementDay]);

  const toggleGroupCollapse = (groupId) => {
    setCollapsedGroups((prevCollapsedGroups) =>
      prevCollapsedGroups.includes(groupId)
        ? prevCollapsedGroups.filter((id) => id !== groupId)
        : [...prevCollapsedGroups, groupId]
    );
  };

  const handleExpandYear = (yearId) => {
    setCollapsedGroups((prevCollapsedGroups) => {
      const monthsInYear = filteredTransactions
        .filter((t) => getYearIdentifier(t.date) === yearId)
        .map((t) => getYearMonthKey(t.date));
      const uniqueMonths = [...new Set(monthsInYear)];
      return prevCollapsedGroups.filter(
        (id) => !uniqueMonths.includes(id) && id !== yearId
      );
    });
  };

  const handleCollapseYear = (yearId) => {
    setCollapsedGroups((prevCollapsedGroups) => {
      const monthsInYear = filteredTransactions
        .filter((t) => getYearIdentifier(t.date) === yearId)
        .map((t) => getYearMonthKey(t.date));
      const uniqueMonths = [...new Set(monthsInYear)];
      return [...prevCollapsedGroups, yearId, ...uniqueMonths];
    });
  };

  const getYearIdentifier = useCallback((date) => {
    return dayjs(date).format('YYYY');
  }, []);

  const getMonthIdentifier = useCallback((date) => {
    return dayjs(date).format('MMMM');
  }, []);

  const getYearMonthKey = useCallback(
    (date) => {
      return `${getYearIdentifier(date)}-${getMonthIdentifier(date)}`;
    },
    [getYearIdentifier, getMonthIdentifier]
  );

  const getPreviousTransaction = (index) => {
    if (index === 0) {
      return null;
    }
    return filteredTransactions[index - 1];
  };

  // Helper function to render statement separators for a given month
  const renderStatementSeparatorsForMonth = (yearMonthKey) => {
    const separators = statementSeparatorsByMonth[yearMonthKey];
    if (!separators || separators.length === 0) {
      return null;
    }

    return separators.map((separator, index) => {
      const statementDate = dayjs(
        `${separator.statementDay} ${separator.statementMonth}`,
        'D MMMM YYYY'
      ).format('MMMM DD YYYY');

      return (
        <StatementSeparatorRow
          key={`statement-${separator.statementMonth}-${index}`}
          statementDate={statementDate}
        />
      );
    });
  };

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
                  <SeparatorRow
                    transaction={transaction}
                    isYear
                    isCollapsed={collapsedGroups.includes(yearId)}
                    onToggleCollapse={() => toggleGroupCollapse(yearId)}
                    onExpandYear={() => handleExpandYear(yearId)}
                    onCollapseYear={() => handleCollapseYear(yearId)}
                  />
                )}
                {isNewMonth && !collapsedGroups.includes(yearId) && (
                  <SeparatorRow
                    transaction={transaction}
                    previousTransaction={previousTransaction}
                    isCollapsed={collapsedGroups.includes(yearMonthKey)}
                    onToggleCollapse={() => toggleGroupCollapse(yearMonthKey)}
                  />
                )}
                {!collapsedGroups.includes(yearId) &&
                  !collapsedGroups.includes(yearMonthKey) && (
                    <>
                      {/* Render statement separators at the beginning of each month */}
                      {isNewMonth &&
                        renderStatementSeparatorsForMonth(yearMonthKey)}
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
