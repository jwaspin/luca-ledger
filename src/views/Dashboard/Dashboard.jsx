import { Box, Link, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
      }}
    >
      <Typography
        variant='h4'
        sx={{ mb: 3, textAlign: 'center' }}
      >
        This Website Has Moved
      </Typography>

      <Typography
        variant='h6'
        sx={{ mb: 2, textAlign: 'center' }}
      >
        Please visit our new location:
      </Typography>

      <Link
        href='https://lucaledger.app'
        target='_blank'
        rel='noopener noreferrer'
        sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
      >
        https://lucaledger.app
      </Link>
    </Box>
  );
}
