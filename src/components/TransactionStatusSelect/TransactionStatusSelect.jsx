import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actions, constants } from '@/store/transactions';

export default function TransactionStatusSelect({ transaction }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [status, setStatus] = useState(transaction.status);

  const handleChange = (event) => {
    const { value } = event.target;
    dispatch(
      actions.updateTransactionProperty(accountId, transaction, 'status', value)
    );
    setStatus(value);
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
        {Object.keys(constants.TransactionStatusEnum).map((key) => {
          return (
            <MenuItem
              key={key}
              value={constants.TransactionStatusEnum[key]}
            >
              {constants.TransactionStatusEnum[key]}
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
