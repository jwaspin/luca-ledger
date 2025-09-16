import { TableCell, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { computeStatementMonth } from './utils';

export default function StatementSeparatorRow({
  statementDay,
  transaction,
  previousTransaction,
  statementDate, // New prop for direct date display
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

  // REVISED LOGIC: Always show the separator when there's a statement month change
  // This ensures separators appear when there are transactions on both sides of the statement boundary
  // The separator will appear inline with the current transaction, which is acceptable since
  // it indicates the end of the previous statement period

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
};
