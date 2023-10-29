import { Box, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editStatementDay } from '@/store/accountsSlice';

export default function CreditCardSettings({ account }) {
  const dispatch = useDispatch();
  const [statementDay, setStatementDay] = useState(account.statementDay || 1);

  const updateStatementDay = (value) => {
    let newValue = null;
    if (value === '') {
      newValue = 1;
    } else {
      newValue = parseInt(value);
    }
    if (newValue < 1) {
      newValue = 1;
    } else if (newValue > 28) {
      newValue = 28;
    }
    setStatementDay(newValue);
    dispatch(editStatementDay(account.id, newValue));
  };

  return (
    <Box sx={{ width: '20%', padding: '5px', borderRight: '1px solid black' }}>
      <Typography
        variant='h6'
        sx={{ textAlign: 'center', borderBottom: '1px solid black' }}
      >
        Credit Card Settings
      </Typography>
      <Box sx={{ marginTop: '10px' }}>
        <TextField
          label='Statement Day'
          type='number'
          value={statementDay}
          onChange={(e) => updateStatementDay(e.target.value)}
          style={{ width: '125px' }}
        />
      </Box>
    </Box>
  );
}

CreditCardSettings.propTypes = {
  account: PropTypes.object.isRequired,
};
