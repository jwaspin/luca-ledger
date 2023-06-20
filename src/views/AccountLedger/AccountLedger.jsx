import { Box } from '@mui/material';

import LedgerTable from './LedgerTable';
import NewTransactionButton from './NewTransactionButton';

export default function AccountLedger() {
  return (
    <Box>
      <LedgerTable />
      <NewTransactionButton />
    </Box>
  );
}
