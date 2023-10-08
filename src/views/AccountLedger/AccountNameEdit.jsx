import { Box, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editAccountName } from '@/store/accountsSlice';

import { Cancel as CancelIcon, Check as SaveIcon } from '@mui/icons-material';

export default function AccountNameEdit({ account, setIsEditing }) {
  const [name, setName] = useState(account.name);
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCancelClick = () => {
    setName(account.name);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    dispatch(editAccountName(account.id, name));
    setIsEditing(false);
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TextField
        value={name}
        onChange={handleNameChange}
      />
      <Button onClick={handleSaveClick}>
        <Button onClick={handleSaveClick}>
          <SaveIcon />
        </Button>
      </Button>
      <Button onClick={handleCancelClick}>
        <CancelIcon />
      </Button>
    </Box>
  );
}

AccountNameEdit.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setIsEditing: PropTypes.func.isRequired,
};