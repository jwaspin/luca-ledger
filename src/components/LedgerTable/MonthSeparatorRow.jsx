import { TableCell, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function MonthSeparatorRow({ transactionMonth }) {
  return (
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
  );
}

MonthSeparatorRow.propTypes = {
  transactionMonth: PropTypes.string.isRequired,
};
