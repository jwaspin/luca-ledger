import { AppBar, Toolbar, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectTransactions } from '../../store/transactionsSlice';
import MainMenu from './MainMenu';
import AccountNameField from './AccountNameField';

export default function AppHeader() {
  const transactions = useSelector(selectTransactions);
  const { modified, accountName } = transactions;

  return (
    <AppBar position='static'>
      <Toolbar>
        <MainMenu />
        <Typography
          variant='h4'
          component='div'
          sx={{ flexGrow: 1 }}
        >
          Finance Tracker
        </Typography>
        <AccountNameField accountName={accountName} />
        {modified && <Typography variant='body1'>Modified</Typography>}
      </Toolbar>
    </AppBar>
  );
}
