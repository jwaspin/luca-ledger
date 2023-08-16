import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectTransactions } from '@/store/transactionsSlice';
import AccountNameField from './AccountNameField';
import MainMenu from './MainMenu';

export default function AppHeader() {
  const transactions = useSelector(selectTransactions);
  const { modified, accountName } = transactions;

  return (
    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ flexDirection: 'row', display: 'flex' }}>
          <MainMenu />
          <Link to='/'>Dashboard</Link>
          <Link to='/accounts'>Accounts</Link>  
          <Link to='/transactions'>Transactions</Link>
          <Typography variant='h4'>Finance Tracker</Typography>
        </Box>
        <Box sx={{ flexDirection: 'row', display: 'flex' }}>
          <AccountNameField accountName={accountName} />
          {modified && <Typography variant='body1'>Modified</Typography>}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
