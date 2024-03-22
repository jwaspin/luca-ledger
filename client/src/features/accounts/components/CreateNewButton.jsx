import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { createNewAccount } from '../store/actions';

export default function CreateNewButton() {
  const dispatch = useDispatch();
  const handleCreateAccount = () => {
    console.log('Creating new account...');
    dispatch(createNewAccount('test', 'test account description'));
  };

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={handleCreateAccount}
    >
      Create New Account
    </Button>
  );
}
