import { TableCell, TableRow } from '@mui/material';

export default function LedgerHeader() {
  return (
    <TableRow>
      <TableCell>Date</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Amount</TableCell>
      <TableCell>Balance</TableCell>
    </TableRow>
  );
}
