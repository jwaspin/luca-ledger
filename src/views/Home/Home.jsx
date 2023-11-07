import { Box, Typography } from '@mui/material';

import config from '@/config';

export default function Home() {
  return (
    <Box
      style={{
        borderBottom: '3px solid black',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='h2'
        style={{ width: '100%', textAlign: 'center', marginBottom: '50px' }}
      >
        Welcome to Luca Ledger
      </Typography>
      <Typography
        variant='body1'
        style={{ width: '75%', textAlign: 'justify' }}
      >
        {config.homeText}
      </Typography>
    </Box>
  );
}
