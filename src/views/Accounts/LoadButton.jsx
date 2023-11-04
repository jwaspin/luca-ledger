import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { actions } from '@/store/accounts';

export default function LoadButton() {
  const dispatch = useDispatch();

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => dispatch(actions.loadAccountAsync())}
    >
      Load Account
    </Button>
  );
}
