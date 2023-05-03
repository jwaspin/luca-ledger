import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { selectTransactions } from '../../store/transactionsSlice';
import LedgerHeader from './LedgerHeader';
import LedgerRow from './LedgerRow';

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
          {transactions.data.map((row) => {
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
