import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';

import { TransactionStatusEnum } from '@/store/transactionsSlice';

export default function TransactionStatusSelect({ transaction }) {
  // const { accoundId } = useParams();
  const [status, setStatus] = useState(transaction.status);
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    const newStatus = event.target.value;
    const newTransaction = { ...transaction };
    newTransaction.status = newStatus;
    // dispatch(updateTransaction(newTransaction));
    setStatus(newStatus);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
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
    </Box>
  );
}

TransactionStatusSelect.propTypes = {
  transaction: PropTypes.object.isRequired,
};
