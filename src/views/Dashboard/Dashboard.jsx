import { useAccountBalances } from '@/hooks/useAccountBalances';
import { selectors } from '@/store/accounts';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import AccountRow from './AccountRow';
import BalanceCard from './BalanceCard';

export default function Dashboard() {
  const accounts = useSelector(selectors.selectAccounts);
  const { accounts: accountsWithBalances, totals } =
    useAccountBalances(accounts);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant='h4'
        sx={{ mb: 4 }}
      >
        Financial Overview
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >
        {[
          {
            title: 'Current Balance',
            amount: totals.current,
            color: '#2196f3',
          },
          { title: 'Pending', amount: totals.pending, color: '#ff9800' },
          { title: 'Scheduled', amount: totals.scheduled, color: '#4caf50' },
          { title: 'Future Balance', amount: totals.future, color: '#9c27b0' },
        ].map((balance) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={balance.title}
          >
            <BalanceCard
              {...balance}
              total={totals.future}
            />
          </Grid>
        ))}
      </Grid>

      <Typography
        variant='h5'
        sx={{ mb: 3 }}
      >
        Accounts
      </Typography>

      {accountsWithBalances.map((account, index) => (
        <AccountRow
          key={account.id || index}
          account={account}
        />
      ))}
    </Box>
  );
}
