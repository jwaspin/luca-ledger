import { TableCell, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// import CategoryPicker from '@/components/CategoryPicker';

export default function CategoryCell({ transaction }) {
  return (
    <TableCell>
      {/* <CategoryPicker transaction={transaction} /> */}
      <Typography>{transaction.category}</Typography>
    </TableCell>
  );
}

CategoryCell.propTypes = {
  transaction: PropTypes.object.isRequired,
};
