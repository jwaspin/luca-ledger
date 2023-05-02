import { Box } from '@mui/material';
import RawLedger from '../../views/RawLedger/RawLedger';

export default function AppContent() {
  return (
    <Box sx={{ height: 'calc(100vh - 64px)' }}>
      <RawLedger />
    </Box>
  );
}
