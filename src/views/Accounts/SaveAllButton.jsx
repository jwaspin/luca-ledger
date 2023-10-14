import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectAccounts } from '@/store/accountsSlice';

export default function SaveAllButton() {
  const accounts = useSelector(selectAccounts);

  const saveAccount = (account, filename) => {
    const saveString = JSON.stringify(account, null, 2);
    const saveBlob = new Blob([saveString]);
    const url = URL.createObjectURL(saveBlob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

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
