import { Box } from '@mui/material';
import AccountLedger from '@/views/AccountLedger/AccountLedger';

export default function AppContent() {
  return (
    <Box sx={{ height: 'calc(100vh - 64px)' }}>
      <AccountLedger />
    </Box>
  );
}
