import { TableCell, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { computeStatementMonth } from './utils';

export default function StatementSeparatorRow({
  statementDay,
  transaction,
  previousTransaction,
  transactions,
}) {
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

  const statementDate = dayjs(
    `${statementDay} ${previousStatementMonth}`,
    'D MMMM YYYY'
  ).format('MMMM DD YYYY');

  // Calculate balance for the statement period that just ended
  const statementBalance = transactions
    .filter((t) => {
      const tStatementMonth = computeStatementMonth(t, statementDay);
      return tStatementMonth === previousStatementMonth;
    })
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const formattedBalance = Math.abs(statementBalance).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return (
    isStatementMonthDifferent && (
      <TableRow>
        <TableCell colSpan={6}>
          <Typography
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Statement {statementDate}</span>
            <span
              style={{
                color: statementBalance < 0 ? 'red' : 'green',
                fontWeight: 'bold',
              }}
            >
              {statementBalance < 0 ? '-' : ''}${formattedBalance}
            </span>
          </Typography>
        </TableCell>
      </TableRow>
    )
  );
}

StatementSeparatorRow.propTypes = {
  statementDay: PropTypes.number.isRequired,
  transaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
  previousTransaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }),
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
};
