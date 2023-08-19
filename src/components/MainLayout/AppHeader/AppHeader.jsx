import styled from '@emotion/styled';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { selectAccountById } from '@/store/accountsSlice';
import AccountNameField from './AccountNameField';

import HomeIcon from '@mui/icons-material/Home';

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
  const { accountId } = useParams();
  const account = useSelector(selectAccountById(accountId));
  const accountInfo = account ? (
    <Box sx={{ flexDirection: 'row', display: 'flex' }}>
      <AccountNameField accountName={account.name} />
      {account.modified && <Typography variant='body1'>Modified</Typography>}
    </Box>
  ) : null;

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
          Finance Tracker
        </Typography>
        {accountInfo}
      </Toolbar>
    </AppBar>
  );
}
