import { TableCell, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { computeStatementMonth } from './utils';

export default function StatementSeparatorRow({
  statementDay,
  transaction,
  previousTransaction,
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

  // Use the balance from the previous transaction, which represents
  // the account balance at the end of the previous statement period
  const statementBalance = previousTransaction.balance || 0;

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
                color: statementBalance < 0 ? 'green' : 'black',
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
    balance: PropTypes.number.isRequired,
  }),
};
