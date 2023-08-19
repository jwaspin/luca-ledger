import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { updateAccount } from '@/store/accountsSlice';

export default function AccountNameField({ accountName }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();

  const handleChange = (event) => {
    const { value } = event.target;
    dispatch(updateAccount({ id: accountId, name: value }));
  };

  return (
    <TextField
      variant='filled'
      value={accountName}
      onChange={handleChange}
    />
  );
}
