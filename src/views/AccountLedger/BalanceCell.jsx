import { TableCell } from '@mui/material';

export default function BalanceCell({ amount }) {
  return <TableCell>$ {parseFloat(amount).toFixed(2)}</TableCell>;
}
