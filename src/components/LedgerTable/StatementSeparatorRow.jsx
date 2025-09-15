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

  const computedStatementDate = dayjs(
    `${statementDay} ${previousStatementMonth}`,
    'D MMMM YYYY'
  ).format('MMMM DD YYYY');

  return (
    isStatementMonthDifferent && (
      <TableRow>
        <TableCell colSpan={6}>
          <Typography>Statement {computedStatementDate}</Typography>
        </TableCell>
      </TableRow>
    )
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
