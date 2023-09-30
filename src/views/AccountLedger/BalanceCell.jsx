import { TableCell } from '@mui/material';
import PropTypes from 'prop-types';

export default function BalanceCell({ amount }) {
  const cellStyle = {
    backgroundColor: amount < 0 ? '#CC4040' : 'inherit',
    width: '150px',
  };

  return (
    <TableCell style={cellStyle}>$ {parseFloat(amount).toFixed(2)}</TableCell>
  );
}

BalanceCell.propTypes = {
  amount: PropTypes.number.isRequired,
};
