import { TableCell } from '@mui/material';

export default function DateCell({ transactionDate }) {
  return <TableCell>{new Date(transactionDate).toDateString()}</TableCell>;
}
