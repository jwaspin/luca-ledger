import { TableRow } from '@mui/material';

import AmountCell from './AmountCell';
import BalanceCell from './BalanceCell';
import DateCell from './DateCell';
import DescriptionCell from './DescriptionCell';
import StatusCell from './StatusCell';

export default function LedgerRow({ row, balance }) {
  return (
    <TableRow>
      <DateCell transaction={row} />
      <StatusCell transaction={row} />
      <DescriptionCell transaction={row} />
      <AmountCell transaction={row} />
      <BalanceCell amount={balance} />
    </TableRow>
  );
}
