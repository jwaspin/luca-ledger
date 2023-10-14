import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { loadAccountAsync } from '@/store/accountsSlice';

export default function LoadButton() {
  const dispatch = useDispatch();

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => dispatch(loadAccountAsync())}
    >
      Load Account
    </Button>
  );
}
