import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { actions, selectors } from '@/store/accounts';

export default function SaveAllButton() {
  const accounts = useSelector(selectors.selectAccounts);

  const handleSaveAllAccounts = () => {
    accounts.forEach((account) => {
      actions.saveAccount(account, `${account.name}.json`);
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
