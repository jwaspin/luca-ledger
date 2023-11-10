import { Box, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { actions, constants } from '@/store/accounts';
import AccountTypePicker from '@/components/AccountTypePicker';

export default function SettingsPanel({ account }) {
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
    dispatch(
      actions.updateAccountProperty(
        account,
        constants.AccountFields.STATEMENT_DAY,
        newValue
      )
    );
  };

  return (
    <Box sx={{ width: '20%', padding: '5px', borderRight: '1px solid black' }}>
      <Typography
        variant='h6'
        sx={{ textAlign: 'center', borderBottom: '1px solid black' }}
      >
        Ledger Settings
      </Typography>
      <Box sx={{ marginTop: '10px' }}>
        <AccountTypePicker account={account} />
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

SettingsPanel.propTypes = {
  account: PropTypes.object.isRequired,
};
