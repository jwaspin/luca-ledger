import { TableRow } from '@mui/material';

import AmountCell from './AmountCell';
import DateCell from './DateCell';
import DescriptionCell from './DescriptionCell';
import StatusCell from './StatusCell';

export default function LedgerRow({ row, balance }) {
  return (
    <TableRow>
      <DateCell transactionDate={row.date} />
      <StatusCell transaction={row} />
      <DescriptionCell transaction={row} />
      <AmountCell amount={row.amount} />
      <AmountCell amount={balance} />
    </TableRow>
  );
}
