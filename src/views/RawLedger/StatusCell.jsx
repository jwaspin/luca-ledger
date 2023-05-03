import { TableCell } from '@mui/material';

import TransactionStatusSelect from '../../components/TransactionStatusSelect';

export default function StatusCell({ transaction }) {
  return (
    <TableCell>
      <TransactionStatusSelect transaction={transaction} />
    </TableCell>
  );
}
