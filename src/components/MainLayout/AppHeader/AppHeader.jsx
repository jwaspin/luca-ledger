import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { selectAccountById } from '@/store/accountsSlice';
import AccountNameField from './AccountNameField';
import MainMenu from './MainMenu';

export default function AppHeader() {
  const { accountId } = useParams();
  const account = useSelector(selectAccountById(accountId));
  const accountInfo = account ? (
    <Box sx={{ flexDirection: 'row', display: 'flex' }}>
      <AccountNameField accountName={account.name} />
      {account.modified && <Typography variant='body1'>Modified</Typography>}
    </Box>
  ) : null;

  return (
    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ flexDirection: 'row', display: 'flex' }}>
          <MainMenu />
          <Link to='/'>Dashboard</Link>
          <Link to='/accounts'>Accounts</Link>
          <Typography variant='h4'>Finance Tracker</Typography>
        </Box>
        {accountInfo}
      </Toolbar>
    </AppBar>
  );
}
