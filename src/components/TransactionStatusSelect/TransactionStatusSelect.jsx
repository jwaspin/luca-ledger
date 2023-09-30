import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  TransactionStatusEnum,
  updateTransaction,
} from '@/store/transactionsSlice';

export default function TransactionStatusSelect({ transaction }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [status, setStatus] = useState(transaction.status);

  const handleChange = (event) => {
    const newStatus = event.target.value;
    const newTransaction = { ...transaction };
    newTransaction.status = newStatus;
    const actionPayload = { accountId, transaction: newTransaction };
    dispatch(updateTransaction(actionPayload));
    setStatus(newStatus);
  };

  return (
    <FormControl
      sx={{ width: '125px' }}
      variant='standard'
      fullWidth
    >
      <InputLabel id='demo-simple-select-label'>Status</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={status}
        label='Status'
        onChange={handleChange}
      >
        {Object.keys(TransactionStatusEnum).map((key) => {
          return (
            <MenuItem
              key={key}
              value={TransactionStatusEnum[key]}
            >
              {TransactionStatusEnum[key]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

TransactionStatusSelect.propTypes = {
  transaction: PropTypes.object.isRequired,
};
