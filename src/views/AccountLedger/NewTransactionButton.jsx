import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addTransaction, createNewTransaction } from '@/store/transactions';

export default function NewTransactionButton() {
  const dispatch = useDispatch();
  const { accountId } = useParams();

  const handleClick = () => {
    const newTransaction = createNewTransaction();
    const actionPayload = { accountId, transaction: newTransaction };
    dispatch(addTransaction(actionPayload));
  };

  return (
    <Button
      variant='contained'
      onClick={handleClick}
      fullWidth
    >
      Add new transaction
    </Button>
  );
}
