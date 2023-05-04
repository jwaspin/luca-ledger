import { Button, TableCell, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateTransaction } from '../../store/transactionsSlice';

const parseFloatDoublePrecision = (value) =>
  parseFloat(parseFloat(value).toFixed(2));

export default function AmountCell({ transaction }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(
    parseFloatDoublePrecision(transaction.amount)
  );
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  const handleSave = () => {
    const newTransaction = { ...transaction };
    newTransaction.amount = parseFloatDoublePrecision(value);
    setValue(newTransaction.amount);
    dispatch(updateTransaction(newTransaction));
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
          onClick={handleSave}
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
