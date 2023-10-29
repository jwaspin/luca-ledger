import styled from '@emotion/styled';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import VersionDisplay from '@/components/VersionDisplay';

import { Home as HomeIcon } from '@mui/icons-material';

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: white;
  &:hover: {
    text-decoration: underline;
  }
`;

export default function AppHeader() {
  return (
    <AppBar position='static'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to='/'>
            <HomeIcon
              sx={{
                fontSize: '3rem',
                color: 'white',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            />
          </Link>
          <StyledLink to='/accounts'>
            <Typography
              variant='body2'
              style={{
                display: 'block',
                marginLeft: '50px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Accounts
            </Typography>
          </StyledLink>
        </Box>
        <Typography
          variant='h4'
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          Luca Ledger
        </Typography>
        <VersionDisplay />
      </Toolbar>
    </AppBar>
  );
}
