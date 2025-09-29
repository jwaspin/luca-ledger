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
import { dateCompareFn, getClosingDateForMonth } from './utils';

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

  // Check if we need a statement separator between current and previous transaction
  const needsStatementSeparator = (
    currentTransaction,
    previousTransaction,
    account
  ) => {
    if (
      !previousTransaction ||
      account.type !== constants.AccountType.CREDIT_CARD
    ) {
      return false;
    }

    const currentDate = dayjs(currentTransaction.date);
    const previousDate = dayjs(previousTransaction.date);
    const currentYear = currentDate.format('YYYY');
    const currentMonth = currentDate.format('MMMM');
    const previousYear = previousDate.format('YYYY');
    const previousMonth = previousDate.format('MMMM');
    const closingDay = account.statementDay || 1;

    // Only check for separators within the same month
    if (currentYear === previousYear && currentMonth === previousMonth) {
      // Use the current date to build the closing date for the same month/year
      const closingDate = dayjs(currentDate).date(closingDay).startOf('day');

      // Check if we crossed the closing date boundary
      const previousBeforeClosing = previousDate.isSameOrBefore(
        closingDate,
        'day'
      );
      const currentAfterClosing = currentDate.isAfter(closingDate, 'day');

      return previousBeforeClosing && currentAfterClosing;
    }

    return false;
  };

  const getPreviousTransaction = (index) => {
    if (index === 0) {
      return null;
    }
    return filteredTransactions[index - 1];
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

            const showStatementSeparator = needsStatementSeparator(
              transaction,
              previousTransaction,
              account
            );

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
                {/* Show statement separator when crossing closing date boundary */}
                {showStatementSeparator &&
                  !collapsedGroups.includes(yearId) &&
                  !collapsedGroups.includes(yearMonthKey) && (
                    <StatementSeparatorRow
                      closingDay={account.statementDay || 1}
                      closingDate={getClosingDateForMonth(
                        yearId,
                        monthId,
                        account.statementDay || 1
                      )}
                      transactions={transactionsWithBalance}
                    />
                  )}
                {!collapsedGroups.includes(yearId) &&
                  !collapsedGroups.includes(yearMonthKey) && (
                    <LedgerRow
                      key={transaction.id}
                      row={transaction}
                      balance={transaction.balance}
                    />
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
