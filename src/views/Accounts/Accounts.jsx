import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  createNewAccount,
  loadAccountAsync,
  selectAccounts,
} from '@/store/accountsSlice';

export default function Accounts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accounts = useSelector(selectAccounts);

  const handleCreateAccount = () => {
    dispatch(createNewAccount());
  };

  const saveAccount = (account, filename) => {
    const saveString = JSON.stringify(account, null, 2);
    const saveBlob = new Blob([saveString]);
    const url = URL.createObjectURL(saveBlob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveAllAccounts = () => {
    accounts.forEach((account) => {
      saveAccount(account, `${account.name}.json`);
    });
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      height='100vh'
    >
      <h1>Accounts</h1>
      <Grid
        container
        spacing={2}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {accounts.map((account) => (
          <Grid
            item
            key={account.id}
          >
            <Card
              onClick={() => navigate(`/accounts/${account.id}`)}
              sx={{
                width: '250px',
                height: '250px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                },
              }}
            >
              <CardContent>
                <Typography variant='h4'>{account.name}</Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <span>{'Current: '}</span>
                  <span>
                    {'$ '}
                    {account.transactions
                      .filter((t) => ['complete '].includes(t.status))
                      .reduce((acc, t) => acc + Number(t.amount), 0)
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </span>
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  style={{
                    marginTop: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <span>{'Pending: '}</span>
                  <span>
                    {'$ '}
                    {account.transactions
                      .filter((t) =>
                        ['complete ', 'pending '].includes(t.status)
                      )
                      .reduce((acc, t) => acc + Number(t.amount), 0)
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </span>
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  style={{
                    marginTop: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <span>{'Scheduled: '}</span>
                  <span>
                    {'$ '}
                    {account.transactions
                      .filter((t) =>
                        ['complete ', 'pending ', 'scheduled '].includes(
                          t.status
                        )
                      )
                      .reduce((acc, t) => acc + Number(t.amount), 0)
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </span>
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  style={{
                    marginTop: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <span>{'Future: '}</span>
                  <span>
                    {'$ '}
                    {account.transactions
                      .reduce((acc, t) => acc + Number(t.amount), 0)
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        style={{
          marginTop: '10px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          spacing={2}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid
            item
            key={0}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={() => dispatch(loadAccountAsync())}
            >
              Load Account
            </Button>
          </Grid>
          <Grid
            item
            key={1}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={handleCreateAccount}
            >
              Create New Account
            </Button>
          </Grid>
          <Grid
            item
            key={2}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={handleSaveAllAccounts}
            >
              Save All Accounts
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
