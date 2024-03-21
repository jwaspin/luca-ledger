import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import VersionDisplay from '@/components/VersionDisplay';
import NavItem from './NavItem';

import { Home as HomeIcon } from '@mui/icons-material';

export default function AppHeader() {
  return (
    <AppBar position='static'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to='/'>
            <HomeIcon
              sx={{
                fontSize: '2rem',
                color: 'white',
                textDecoration: 'none',
              }}
            />
          </Link>
          <NavItem
            linkTo='/dashboard'
            navText='Dashboard'
          />
          <NavItem
            linkTo='/accounts'
            navText='Accounts'
          />
          <NavItem
            linkTo='/entities'
            navText='Entities'
          />
          <NavItem
            linkTo='/categories'
            navText='Categories'
          />
          <NavItem
            linkTo='/recurring'
            navText='Recurring'
          />
        </Box>
        <Typography
          variant='h5'
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          Luca Ledger
        </Typography>
        <VersionDisplay />
      </Toolbar>
    </AppBar>
  );
}
