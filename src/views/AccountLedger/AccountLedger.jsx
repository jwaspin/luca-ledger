import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectAccountById } from '@/store/accountsSlice';
import LedgerTable from './LedgerTable';
import NewTransactionButton from './NewTransactionButton';

export default function AccountLedger() {
  const { accountId } = useParams();
  const account = useSelector(selectAccountById(accountId));

  console.log('AccountLedger', account);

  return (
    <Box>
      <h1>Account Ledger {account.name}</h1>
      <LedgerTable />
      <NewTransactionButton />
    </Box>
  );
}
