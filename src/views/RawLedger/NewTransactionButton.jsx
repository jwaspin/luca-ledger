import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../store/transactionsSlice';

export default function NewTransactionButton() {
  const dispatch = useDispatch();

  return (
    <Button
      variant='contained'
      onClick={() => dispatch(addTransaction({ id: 99, date: '1/2/2002' }))}
      fullWidth
    >
      Add new transaction
    </Button>
  );
}
