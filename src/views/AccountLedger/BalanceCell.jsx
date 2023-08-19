import { TableCell } from '@mui/material';
import PropTypes from 'prop-types';

export default function BalanceCell({ amount }) {
  return <TableCell>$ {parseFloat(amount).toFixed(2)}</TableCell>;
}

BalanceCell.propTypes = {
  amount: PropTypes.number.isRequired,
};
