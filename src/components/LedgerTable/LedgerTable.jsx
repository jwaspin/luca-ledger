import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { Fragment } from 'react';
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
  let previousMonth = null;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <LedgerHeader />
        </TableHead>
        <TableBody>
          {[...transactions].sort(dateCompareFn).map((row) => {
            currentBalance += parseFloat(row.amount);
            const transactionDate = dayjs(row.date);
            const transactionMonth = transactionDate.format('MMMM YYYY');
            if (transactionMonth !== previousMonth) {
              previousMonth = transactionMonth;
              return (
                <Fragment key={transactionMonth}>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography
                        variant='h4'
                        style={{
                          justifyContent: 'center',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        {transactionMonth}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <LedgerRow
                    key={row.id}
                    row={row}
                    balance={currentBalance}
                  />
                </Fragment>
              );
            }

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
