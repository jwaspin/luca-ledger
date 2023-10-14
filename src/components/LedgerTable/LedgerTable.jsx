import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import config from '@/config';
import { selectAccountById } from '@/store/accountsSlice';
import LedgerHeader from './LedgerHeader';
import LedgerRow from './LedgerRow';

const dateCompareFn = (a, b) => {
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
  const { accountId } = useParams();
  const account = useSelector(selectAccountById(accountId));
  const { transactions } = account;

  let currentBalance = 0.0;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <LedgerHeader />
        </TableHead>
        <TableBody>
          {[...transactions].sort(dateCompareFn).map((row) => {
            currentBalance += parseFloat(row.amount);
            return (
              <LedgerRow
                key={row.id}
                row={row}
                balance={currentBalance}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
