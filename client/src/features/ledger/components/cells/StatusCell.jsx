import { TableCell, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// import TransactionStatusSelect from '@/components/TransactionStatusSelect';

export default function StatusCell({ transaction }) {
  return (
    <TableCell
      style={{
        width: '175px',
        padding: '0px 0px 0px 10px',
      }}
    >
      {/* <TransactionStatusSelect transaction={transaction} /> */}
      <Typography variant='body1'>{transaction.transactionState}</Typography>
    </TableCell>
  );
}

StatusCell.propTypes = {
  transaction: PropTypes.object.isRequired,
};
