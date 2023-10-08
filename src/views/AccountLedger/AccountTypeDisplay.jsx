import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AccountType, editAccountType } from '@/store/accountsSlice';

export default function AccountTypeDisplay({ account }) {
  const [type, setType] = useState(account.type);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const accountType = event.target.value;
    setType(accountType);
    dispatch(editAccountType(account.id, accountType));
  };

  return (
    <Box>
      <Typography variant='h5'>Account Type</Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='account-type-label'>Account Type</InputLabel>
        <Select
          labelId='account-type-label'
          id='account-type'
          value={type}
          label='Account Type'
          onChange={handleChange}
        >
          {Object.keys(AccountType).map((key) => (
            <MenuItem
              key={key}
              value={AccountType[key]}
            >
              {AccountType[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

AccountTypeDisplay.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
