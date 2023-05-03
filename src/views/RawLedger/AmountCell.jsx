import { TableCell } from '@mui/material';

export default function AmountCell({ amount }) {
  return <TableCell>$ {parseFloat(amount).toFixed(2)}</TableCell>;
}
