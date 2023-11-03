import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { AccountType, selectAccounts } from '@/store/accounts';
import { doublePrecisionFormatString } from '@/utils';
import AccountContainer from './AccountContainer';

const calculateBalance = (transactions, statuses) => {
  return transactions
    .filter((tx) => statuses.includes(tx.status))
    .reduce((acc, tx) => acc + Number(tx.amount), 0);
};

function subtractPositiveBalance(totalBalance, currentBalance) {
  return totalBalance - (currentBalance > 0 ? currentBalance : 0);
}

export default function Dashboard() {
  const accounts = useSelector(selectAccounts);

  let totalCurrentBalance = 0;
  let totalPendingBalance = 0;
  let totalScheduledBalance = 0;
  let totalFutureBalance = 0;

  const accountsWithBalances = accounts.map((account) => {
    const currentBalance = calculateBalance(account.transactions, [
      'complete ',
    ]);
    const pendingBalance = calculateBalance(account.transactions, [
      'complete ',
      'pending ',
    ]);
    const scheduledBalance = calculateBalance(account.transactions, [
      'complete ',
      'pending ',
      'scheduled ',
    ]);
    const futureBalance = calculateBalance(account.transactions, [
      'complete ',
      'pending ',
      'scheduled ',
      'planned ',
    ]);

    if (account.type === AccountType.CREDIT_CARD) {
      totalCurrentBalance = subtractPositiveBalance(
        totalCurrentBalance,
        currentBalance
      );
      totalPendingBalance = subtractPositiveBalance(
        totalPendingBalance,
        pendingBalance
      );
      totalScheduledBalance = subtractPositiveBalance(
        totalScheduledBalance,
        scheduledBalance
      );
      totalFutureBalance = subtractPositiveBalance(
        totalFutureBalance,
        futureBalance
      );
    } else {
      totalCurrentBalance += currentBalance;
      totalPendingBalance += pendingBalance;
      totalScheduledBalance += scheduledBalance;
      totalFutureBalance += futureBalance;
    }
    return {
      ...account,
      currentBalance,
      pendingBalance,
      scheduledBalance,
      futureBalance,
    };
  });

  return (
    <Box ml='50px'>
      <h2>Accounts</h2>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={2}
        >
          <Typography variant='h4'>Name</Typography>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Typography variant='h4'>Current</Typography>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Typography variant='h4'>Pending</Typography>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Typography variant='h4'>Scheduled</Typography>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Typography variant='h4'>Future</Typography>
        </Grid>
      </Grid>
      {accountsWithBalances.map((a, i) => (
        <AccountContainer
          account={a}
          key={i}
        />
      ))}
      <Grid
        container
        spacing={2}
        style={{ marginTop: '10px' }}
      >
        <Grid
          item
          xs={2}
        >
          <Typography variant='h5'>Totals</Typography>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Typography variant='h5'>
            $ {doublePrecisionFormatString(totalCurrentBalance)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Typography variant='h5'>
            $ {doublePrecisionFormatString(totalPendingBalance)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Typography variant='h5'>
            $ {doublePrecisionFormatString(totalScheduledBalance)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Typography variant='h5'>
            $ {doublePrecisionFormatString(totalFutureBalance)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
