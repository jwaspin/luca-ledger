import { Button } from '@mui/material';
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

  return (
    <div>
      <h1>Accounts</h1>
      <ul>
        {accounts.map((account) => (
          <li
            key={account.id}
            onClick={() => navigate(`/accounts/${account.id}`)}
          >
            {account.name} - {account.balance}
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
    </div>
  );
}
