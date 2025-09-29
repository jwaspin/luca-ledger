import { TableCell, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { computeStatementMonth } from './utils';

export default function StatementSeparatorRow({
  closingDay,
  transactions,
  closingDate, // The closing date for this statement period
}) {
  // If closingDate is provided, use it to calculate the statement period and charges
  if (closingDate) {
    // Parse the closing date to get the statement period
    const closingDateObj = dayjs(closingDate, 'MMMM DD YYYY');
    const startDate = closingDateObj.subtract(1, 'month').add(1, 'day');
    
    // Get all transactions for this statement period to calculate charges
    const statementMonth = closingDateObj.format('MMMM YYYY');
    
    const statementTransactions = transactions
      .filter((t) => {
        const tStatementMonth = computeStatementMonth(t, closingDay);
        return tStatementMonth === statementMonth;
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
            <span>
              Statement {startDate.format('MMMM DD')} - {closingDate}
            </span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
              <span style={{ color: 'black' }}>
                ${formatAmount(allCharges)}
              </span>
            </div>
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  // Legacy fallback behavior (should not be used in new implementation)
  return null;
}

StatementSeparatorRow.propTypes = {
  closingDay: PropTypes.number.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
  closingDate: PropTypes.string.isRequired, // Now the primary prop
};
