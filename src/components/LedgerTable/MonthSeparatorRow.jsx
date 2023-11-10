import { TableCell, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function MonthSeparatorRow({
  transaction,
  previousTransaction,
}) {
  const transactionDate = dayjs(transaction.date);
  const transactionMonth = transactionDate.format('MMMM YYYY');
  const previousTransactionDate = dayjs(previousTransaction.date);
  const previousMonth = previousTransactionDate.format('MMMM YYYY');
  const isMonthDifferent = transactionMonth !== previousMonth;

  return (
    isMonthDifferent && (
      <TableRow>
        <TableCell colSpan={6}>
          <Typography
            variant='h4'
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {transactionMonth}
          </Typography>
        </TableCell>
      </TableRow>
    )
  );
}

MonthSeparatorRow.propTypes = {
  transaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
  previousTransaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }),
};
