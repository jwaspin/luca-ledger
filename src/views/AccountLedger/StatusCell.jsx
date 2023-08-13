import { TableCell } from '@mui/material';

import TransactionStatusSelect from '@/components/TransactionStatusSelect';

export default function StatusCell({ transaction }) {
  return (
    <TableCell style={ {maxWidth: '50px'} }>
      <TransactionStatusSelect transaction={transaction} />
    </TableCell>
  );
}
