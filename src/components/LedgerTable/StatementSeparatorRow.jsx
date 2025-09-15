import { TableCell, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { computeStatementMonth } from './utils';

export default function StatementSeparatorRow({
  statementDay,
  transaction,
  previousTransaction,
  statementDate, // New prop for direct date display
  currentYearMonthKey, // New prop to help determine if separator should show here
}) {
  // If statementDate is provided directly, use it
  if (statementDate) {
    return (
      <TableRow>
        <TableCell colSpan={6}>
          <Typography>Statement {statementDate}</Typography>
        </TableCell>
      </TableRow>
    );
  }

  // Legacy behavior for backward compatibility
  if (!previousTransaction) {
    return null;
  }

  const currentStatementMonth = computeStatementMonth(
    transaction,
    statementDay
  );
  const previousStatementMonth = computeStatementMonth(
    previousTransaction,
    statementDay
  );
  const isStatementMonthDifferent =
    currentStatementMonth !== previousStatementMonth;

  if (!isStatementMonthDifferent) {
    return null;
  }

  // NEW LOGIC: Check if this separator should appear in this month section
  if (currentYearMonthKey) {
    // The separator should only appear if the previousStatementMonth belongs to the current month section
    // For example, if previousStatementMonth is "November 2024", it should appear under "November 2024" section
    const expectedYearMonthKey = dayjs(
      previousStatementMonth,
      'MMMM YYYY'
    ).format('YYYY-MMMM');

    if (currentYearMonthKey !== expectedYearMonthKey) {
      return null; // Don't render separator in this month section
    }
  }

  const computedStatementDate = dayjs(
    `${statementDay} ${previousStatementMonth}`,
    'D MMMM YYYY'
  ).format('MMMM DD YYYY');

  return (
    <TableRow>
      <TableCell colSpan={6}>
        <Typography>Statement {computedStatementDate}</Typography>
      </TableCell>
    </TableRow>
  );
}

StatementSeparatorRow.propTypes = {
  statementDay: PropTypes.number,
  transaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }),
  previousTransaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }),
  statementDate: PropTypes.string, // New prop
  currentYearMonthKey: PropTypes.string, // New prop
};
