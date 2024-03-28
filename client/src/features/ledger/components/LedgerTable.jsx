import { Paper, Table, TableBody, TableContainer } from '@mui/material';
// import dayjs from 'dayjs';
// import PropTypes from 'prop-types';
import { /* Fragment, useEffect, */ useMemo /* , useState */ } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LedgerRow from './LedgerRow';
// import config from '@/config';
import { selectTransactionsByAccountId } from '../store/selectors';
import TableHeader from './TableHeader';
// import MonthSeparatorRow from './MonthSeparatorRow';
// import StatementSeparatorRow from './StatementSeparatorRow';
import { dateCompareFn } from '../utils';
import { TransactionStateEnum } from '@/store/constants';

export default function LedgerTable(/* { filterValue } */) {
  const { accountId } = useParams();
  const transactions = useSelector(selectTransactionsByAccountId(accountId));

  const sortedTransactions = useMemo(
    () =>
      [...transactions]
        .filter((tx) => tx.transactionState !== TransactionStateEnum.DELETED)
        .sort(dateCompareFn),
    [transactions]
  );

  // const filteredTransactions = useMemo(() => {
  //   if (!filterValue) {
  //     return transactionsWithBalance;
  //   }
  //   return transactionsWithBalance.filter((transaction) =>
  //     transaction.description.toLowerCase().includes(filterValue.toLowerCase())
  //   );
  // }, [filterValue, transactionsWithBalance]);

  // const toggleGroupCollapse = (groupId) => {
  //   setCollapsedGroups((prevCollapsedGroups) =>
  //     prevCollapsedGroups.includes(groupId)
  //       ? prevCollapsedGroups.filter((id) => id !== groupId)
  //       : [...prevCollapsedGroups, groupId]
  //   );
  // };

  // const getMonthIdentifier = (date) => {
  //   return dayjs(date).format(config.monthFormatString);
  // };

  // const getPreviousTransaction = (index) => {
  //   if (index === 0) {
  //     return null;
  //   }
  //   return filteredTransactions[index - 1];
  // };

  // useEffect(() => {
  //   const initialCollapsedGroups = filteredTransactions
  //     .map((transaction) => getMonthIdentifier(transaction.date))
  //     .filter(
  //       (month, index, self) =>
  //         self.indexOf(month) === index &&
  //         ![
  //           getMonthIdentifier(dayjs().subtract(1, 'month')),
  //           getMonthIdentifier(dayjs()),
  //           getMonthIdentifier(dayjs().add(1, 'month')),
  //         ].includes(month)
  //     );

  //   setCollapsedGroups(initialCollapsedGroups);
  // }, [filteredTransactions]);

  let balance = 0.0;

  return (
    <TableContainer
      component={Paper}
      style={{ height: 'calc(100vh - 250px)' }}
    >
      <Table stickyHeader>
        <TableHeader />
        <TableBody>
          {sortedTransactions.map((transaction /* , index */) => (
            <LedgerRow
              key={transaction.id}
              transaction={transaction}
              balance={(balance += transaction.amount)}
              // previousTransaction={getPreviousTransaction(index)}
              // isCollapsed={collapsedGroups.includes(
              //   getMonthIdentifier(transaction.date)
              // )}
              // onToggleCollapse={() =>
              //   toggleGroupCollapse(getMonthIdentifier(transaction.date))
              // }
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// LedgerTable.propTypes = {
//   filterValue: PropTypes.string,
// };
