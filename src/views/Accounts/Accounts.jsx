import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectors } from '@/store/accounts';
import AccountCard from './AccountCard';
import ButtonGroup from './ButtonGroup';

// const accountSortByType = (a, b) => {
//   if (a.type === 'credit' && b.type === 'credit') {
//     return a.name.localeCompare(b.name);
//   }
//   if (a.type === 'credit') {
//     return 1;
//   }
//   if (b.type === 'credit') {
//     return -1;
//   }
//   return a.name.localeCompare(b.name);
// };

const accountSortByName = (a, b) => a.name.localeCompare(b.name);

export default function Accounts() {
  const accounts = useSelector(selectors.selectAccounts);
  const sortedAccounts = [...accounts].sort(accountSortByName);

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
        {sortedAccounts.map((account) => (
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
