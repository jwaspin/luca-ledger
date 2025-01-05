import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import LedgerTable from '@/components/LedgerTable';
import RepeatedTransactionsModal from '@/components/RepeatedTransactionsModal';
import SettingsPanel from '@/components/SettingsPanel';
import { selectors } from '@/store/accounts';
import AccountName from './AccountName';
import NewTransactionButton from './NewTransactionButton';

export default function Ledger() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState('');
  const account = useSelector(selectors.selectAccountById(accountId));

  useEffect(() => {
    if (!account) {
      navigate('/accounts');
    }
  }, [account, navigate]);

  if (!account) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '18%',
          borderRight: '1px solid black',
        }}
      >
        <SettingsPanel account={account} />
      </Box>
      <Box sx={{ width: '82%', overflow: 'hidden' }}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px',
          }}
        >
          <AccountName account={account} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '15px',
          }}
        >
          <TextField
            id='filter'
            label='Filter'
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            variant='outlined'
            size='small'
            sx={{ width: '700px' }}
          />
        </Box>
        <LedgerTable filterValue={filterValue} />
        <NewTransactionButton />
        <RepeatedTransactionsModal />
      </Box>
    </Box>
  );
}
