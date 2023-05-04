import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import { selectTransactions } from '../../store/transactionsSlice';
import LedgerHeader from './LedgerHeader';
import LedgerRow from './LedgerRow';
import config from '../../config';

const compareFn = (a, b) => {
  const aDate = dayjs(a.date).format(config.compareDateFormatString);
  const bDate = dayjs(b.date).format(config.compareDateFormatString);
  if (aDate < bDate) {
    return -1;
  }
  if (aDate > bDate) {
    return 1;
  }
  return 0;
};

export default function LedgerTable() {
  const transactions = useSelector(selectTransactions);
  let balance = 0.0;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <LedgerHeader />
        </TableHead>
        <TableBody>
          {[...transactions.data].sort(compareFn).map((row) => {
            balance += parseFloat(row.amount);
            return (
              <LedgerRow
                key={row.id}
                row={row}
                balance={balance}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
