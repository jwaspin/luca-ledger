import { Box } from '@mui/material';

import LedgerTable from './LedgerTable';
import NewTransactionButton from './NewTransactionButton';

export default function RawLedger() {
  return (
    <Box>
      <LedgerTable />
      <NewTransactionButton />
    </Box>
  );
}
