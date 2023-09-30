import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectAccountById } from '@/store/accountsSlice';
import LedgerTable from './LedgerTable';
import NewTransactionButton from './NewTransactionButton';
import RepeatedTransactionsModal from '@/components/RepeatedTransactionsModal';

export default function AccountLedger() {
  const { accountId } = useParams();
  const account = useSelector(selectAccountById(accountId));

  return (
    <Box sx={{ width: '60%', mx: 'auto' }}>
      <h1>{account.name} Bank</h1>
      <Box
        sx={{
          height: 'calc(100vh - 300px)',
          overflowY: 'scroll',
        }}
      >
        <LedgerTable />
      </Box>
      <NewTransactionButton />
      <RepeatedTransactionsModal />
    </Box>
  );
}
