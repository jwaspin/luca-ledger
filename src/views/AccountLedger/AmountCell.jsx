import { Button, TableCell, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectAccounts } from '@/store/accountsSlice';
import { updateTransaction } from '@/store/transactionsSlice';

const parseFloatDoublePrecision = (value) =>
  parseFloat(parseFloat(value).toFixed(2));

export default function AmountCell({ transaction }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const accounts = useSelector(selectAccounts);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(
    parseFloatDoublePrecision(transaction.amount)
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  const handleUpdateTransaction = (accountId, transaction) => {
    const account = accounts.find((a) => a.id === accountId);
    if (account) {
      const updatedTransaction = { ...transaction, modified: true };
      dispatch(
        updateTransaction({
          accountId,
          transaction: updatedTransaction,
        })
      );
    }
    setEdit(false);
  };

  const handleCancel = () => {
    setValue(parseFloatDoublePrecision(transaction.amount));
    setEdit(false);
  };

  if (edit) {
    return (
      <TableCell>
        <TextField
          variant='filled'
          value={value}
          onChange={handleChange}
        />
        <Button
          variant='contained'
          onClick={() => handleUpdateTransaction(accountId, transaction)}
        >
          Save
        </Button>
        <Button
          variant='outlined'
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </TableCell>
    );
  }

  return (
    <TableCell
      style={{ cursor: 'pointer' }}
      onClick={() => setEdit(true)}
    >
      $ {parseFloat(transaction.amount).toFixed(2)}
    </TableCell>
  );
}
