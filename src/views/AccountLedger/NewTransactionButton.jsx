import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';
import {
  TransactionStatusEnum,
  addTransaction,
} from '@/store/transactionsSlice';

export default function NewTransactionButton() {
  const dispatch = useDispatch();

  const handleClick = () => {
    const newTransaction = {
      id: uuidv4(),
      date: dayjs().format(config.dateFormatString),
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
