import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  createNewAccount,
  loadAccountAsync,
  selectAccounts,
} from '@/store/accountsSlice';

export default function Accounts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accounts = useSelector(selectAccounts);

  const handleCreateAccount = () => {
    dispatch(createNewAccount());
  };

  const saveAccount = (account, filename) => {
    const saveString = JSON.stringify(account, null, 2);
    const saveBlob = new Blob([saveString]);
    const url = URL.createObjectURL(saveBlob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveAllAccounts = () => {
    accounts.forEach((account) => {
      saveAccount(account, `${account.name}.json`);
    });
  };

  return (
    <div>
      <h1>Accounts</h1>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            <Box
              onClick={() => navigate(`/accounts/${account.id}`)}
              onKeyDown={() => navigate(`/accounts/${account.id}`)}
            >
              <Typography
                variant='body1'
                component='span'
                style={{ marginRight: '1rem' }}
              >
                {account.name}
              </Typography>
              <Typography
                variant='body2'
                component='span'
              >
                {account.balance}
              </Typography>
            </Box>
          </li>
        ))}
      </ul>
      <Button
        variant='contained'
        color='primary'
        onClick={() => dispatch(loadAccountAsync())}
      >
        Load Account
      </Button>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleCreateAccount}
      >
        Create New Account
      </Button>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleSaveAllAccounts}
      >
        Save All Accounts
      </Button>
    </div>
  );
}
