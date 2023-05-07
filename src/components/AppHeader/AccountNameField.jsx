import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

import { modifyAccountName } from '../../store/transactionsSlice';

export default function AccountNameField({ accountName }) {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(modifyAccountName(event.target.value));
  };

  return (
    <TextField
      variant='filled'
      value={accountName}
      onChange={handleChange}
    />
  );
}
