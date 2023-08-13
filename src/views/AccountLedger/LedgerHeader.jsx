import { TableCell, TableRow } from '@mui/material';

export default function LedgerHeader() {
  return (
    <TableRow>
      <TableCell>Status</TableCell>
      <TableCell>Date</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Amount</TableCell>
      <TableCell>Balance</TableCell>
    </TableRow>
  );
}
