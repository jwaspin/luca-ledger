import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  TransactionStatusEnum,
  addTransaction,
} from '../../store/transactionsSlice';

export default function NewTransactionButton() {
  const dispatch = useDispatch();

  const handleClick = () => {
    const newTransaction = {
      id: uuidv4(),
      date: Date.now(),
      status: TransactionStatusEnum.PLANNED,
      description: '',
      amount: 0.0,
    };
    dispatch(addTransaction(newTransaction));
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
