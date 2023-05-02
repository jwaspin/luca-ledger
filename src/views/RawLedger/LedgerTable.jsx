import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { selectTransactions } from '../../store/transactionsSlice';
import TransactionStatusSelect from '../../components/TransactionStatusSelect/TransactionStatusSelect';

export default function LedgerTable() {
  const transactions = useSelector(selectTransactions);
  let balance = 0.0;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.data.map((row) => {
            balance += parseFloat(row.amount);
            return (
              <TableRow key={row.id}>
                <TableCell>{new Date(row.date).toDateString()}</TableCell>
                <TableCell>
                  <TransactionStatusSelect
                    currentStatus={row.status}
                    transactionId={row.id}
                  />
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>$ {parseFloat(row.amount).toFixed(2)}</TableCell>
                <TableCell>$ {parseFloat(balance).toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
