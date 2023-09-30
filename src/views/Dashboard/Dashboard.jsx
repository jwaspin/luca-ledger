import { Box, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectAccounts } from '@/store/accountsSlice';

const doublePrecisionFormatString = (value) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const calculateBalance = (transactions, statuses) => {
  return transactions
    .filter((tx) => statuses.includes(tx.status))
    .reduce((acc, tx) => acc + Number(tx.amount), 0);
};

const AccountContainer = ({ account }) => {
  const { currentBalance, pendingBalance, scheduledBalance, futureBalance } =
    account;

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={2}
      >
        <Typography variant='h5'>{account.name}</Typography>
      </Grid>
      <Grid
        item
        xs={2}
      >
        <Typography variant='h6'>
          $ {doublePrecisionFormatString(currentBalance)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
      >
        <Typography variant='h6'>
          $ {doublePrecisionFormatString(pendingBalance)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
      >
        <Typography variant='h6'>
          $ {doublePrecisionFormatString(scheduledBalance)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
      >
        <Typography variant='h6'>
          $ {doublePrecisionFormatString(futureBalance)}
        </Typography>
      </Grid>
    </Grid>
  );
};

AccountContainer.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currentBalance: PropTypes.number.isRequired,
    pendingBalance: PropTypes.number.isRequired,
    scheduledBalance: PropTypes.number.isRequired,
    futureBalance: PropTypes.number.isRequired,
  }).isRequired,
};

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

    totalCurrentBalance += currentBalance;
    totalPendingBalance += pendingBalance;
    totalScheduledBalance += scheduledBalance;
    totalFutureBalance += futureBalance;

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
