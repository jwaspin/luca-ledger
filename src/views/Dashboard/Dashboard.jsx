import { Box, Link, Typography } from '@mui/material';
import SaveAllButton from '@/views/Accounts/SaveAllButton';

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

      <Typography
        variant='body1'
        sx={{ mt: 3, textAlign: 'center', maxWidth: '600px' }}
      >
        This page will remain active for a short period to allow users to save
        their data and transition to the new site. It is recommended that you
        use the button below to save your data and load it into the new site.
        Thank you for your understanding and continued support!
      </Typography>

      <Box sx={{ mt: 2 }}>
        <SaveAllButton />
      </Box>
    </Box>
  );
}
