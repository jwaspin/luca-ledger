import { Button, TableCell, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { updateTransaction } from '@/store/transactionsSlice';

const doublePrecisionFormatString = (value) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function AmountCell({ transaction }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(
    doublePrecisionFormatString(transaction.amount)
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  const handleSave = () => {
    const newTransaction = { ...transaction };
    newTransaction.amount = doublePrecisionFormatString(value);
    const actionPayload = { accountId, transaction: newTransaction };
    dispatch(updateTransaction(actionPayload));
    setEdit(false);
  };

  const handleCancel = () => {
    setValue(doublePrecisionFormatString(transaction.amount));
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
      style={{ cursor: 'pointer', width: '150px' }}
      onClick={() => setEdit(true)}
    >
      $ {doublePrecisionFormatString(transaction.amount)}
    </TableCell>
  );
}

AmountCell.propTypes = {
  transaction: PropTypes.object.isRequired,
};
