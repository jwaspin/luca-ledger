import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { createNewAccount } from '@/store/accountsSlice';

export default function CreateNewButton() {
  const dispatch = useDispatch();
  const handleCreateAccount = () => {
    dispatch(createNewAccount());
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
