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

  // Get all transactions for the previous statement period
  const statementTransactions = transactions
    .filter((t) => {
      const tStatementMonth = computeStatementMonth(t, statementDay);
      return tStatementMonth === previousStatementMonth;
    })
    .filter((t) => {
      // Filter out payments - case insensitive check for "payment" in description
      return !t.description.toLowerCase().includes('payment');
    });

  // Calculate charges by status
  const allCharges = statementTransactions.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );
  const pendingCharges = statementTransactions
    .filter((t) => t.status?.trim() === 'pending')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const scheduledCharges = statementTransactions
    .filter((t) => t.status?.trim() === 'scheduled')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const formatAmount = (amount) => {
    return Math.abs(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    isStatementMonthDifferent && (
      <TableRow>
        <TableCell
          colSpan={6}
          style={{ backgroundColor: '#f5f5f5', padding: '8px 16px' }}
        >
          <Typography
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            <span>Statement {statementDate}</span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ color: 'black' }}>
                All: ${formatAmount(allCharges)}
              </span>
              {pendingCharges > 0 && (
                <span style={{ color: '#cc8800' }}>
                  Pending: ${formatAmount(pendingCharges)}
                </span>
              )}
              {scheduledCharges > 0 && (
                <span style={{ color: '#0066cc' }}>
                  Scheduled: ${formatAmount(scheduledCharges)}
                </span>
              )}
            </div>
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
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
};
