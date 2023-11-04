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

import { actions, constants } from '@/store/accounts';

export default function AccountTypeDisplay({ account }) {
  const [type, setType] = useState(account.type);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    setType(value);
    dispatch(
      actions.updateAccountProperty(
        account,
        constants.AccountFields.TYPE,
        value
      )
    );
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
          {Object.keys(constants.AccountType).map((key) => (
            <MenuItem
              key={key}
              value={constants.AccountType[key]}
            >
              {constants.AccountType[key]}
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
