import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectAccounts, saveAccount } from '@/store/accountsSlice';

export default function SaveAllButton() {
  const accounts = useSelector(selectAccounts);

  const handleSaveAllAccounts = () => {
    accounts.forEach((account) => {
      saveAccount(account, `${account.name}.json`);
    });
  };

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={handleSaveAllAccounts}
    >
      Save All Accounts
    </Button>
  );
}
