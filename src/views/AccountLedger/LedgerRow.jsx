import { TableRow } from '@mui/material';

import AmountCell from './AmountCell';
import BalanceCell from './BalanceCell';
import DateCell from './DateCell';
import DescriptionCell from './DescriptionCell';
import StatusCell from './StatusCell';
import { TransactionStatusEnum } from '../../store/transactionsSlice';

const setBgColor = (status) => {
  switch (status) {
    case TransactionStatusEnum.COMPLETE:
      return 'lightgray';
    case TransactionStatusEnum.PENDING:
      return 'yellow';
    case TransactionStatusEnum.PLANNED:
      return 'lightgreen';
    case TransactionStatusEnum.SCHEDULED:
      return 'lightblue';
    default:
      return 'white';
  }
};

export default function LedgerRow({ row, balance }) {
  const bgColor = setBgColor(row.status);

  return (
    <TableRow style={{ background: bgColor }}>
      <StatusCell transaction={row} />
      <DateCell transaction={row} />
      <DescriptionCell transaction={row} />
      <AmountCell transaction={row} />
      <BalanceCell amount={balance} />
    </TableRow>
  );
}
