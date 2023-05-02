import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { TransactionStatusEnum } from '../../store/transactionsSlice';

export default function TransactionStatusSelect({ transaction }) {
  const [status, setStatus] = useState(transaction.status);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setStatus(event.target.value);
    dispatch();
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
              <MenuItem value={TransactionStatusEnum[key]}>
                {TransactionStatusEnum[key]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
