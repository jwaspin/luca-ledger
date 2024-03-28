import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { TransactionStateEnum } from '@/store/constants';
import { updateTransactionById } from '../../store/actions';

export default function TransactionStatePicker({ transaction }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(transaction.status);

  const handleChange = (event) => {
    const newTransaction = {
      ...transaction,
      transactionState: event.target.value,
    };
    const { value } = event.target;
    setStatus(value);
    dispatch(updateTransactionById(transaction.id, newTransaction));
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
        {Object.keys(TransactionStateEnum).map((key) => {
          return (
            <MenuItem
              key={key}
              value={TransactionStateEnum[key]}
            >
              {TransactionStateEnum[key]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

TransactionStatePicker.propTypes = {
  transaction: PropTypes.object.isRequired,
};
