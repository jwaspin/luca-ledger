import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectAccounts } from '@/store/accountsSlice';
import AccountCard from './AccountCard';
import ButtonGroup from './ButtonGroup';

export default function Accounts() {
  const accounts = useSelector(selectAccounts);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      height='100vh'
    >
      <Typography
        variant='h3'
        style={{ fontWeight: 'bold', padding: '18px' }}
      >
        Accounts
      </Typography>
      <Grid
        container
        spacing={2}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '60%',
        }}
      >
        {accounts.map((account) => (
          <Grid
            item
            key={account.id}
          >
            <AccountCard account={account} />
          </Grid>
        ))}
      </Grid>
      <ButtonGroup />
    </Box>
  );
}
