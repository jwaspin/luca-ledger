import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import SettingsPanel from '@/components/SettingsPanel';
import LedgerTable from '@/components/LedgerTable';
import RepeatedTransactionsModal from '@/components/RepeatedTransactionsModal';
import { constants, selectors } from '@/store/accounts';
import AccountName from './AccountName';
import BalanceDisplay from './BalanceDisplay';
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

  const { transactions } = account;

  const completedBalance = transactions
    .filter((transaction) => transaction.status === 'complete ')
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

  const pendingBalance = transactions
    .filter((transaction) =>
      ['complete ', 'pending '].includes(transaction.status)
    )
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

  const scheduledBalance = transactions
    .filter((transaction) =>
      ['complete ', 'pending ', 'scheduled '].includes(transaction.status)
    )
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

  const futureBalance = transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 65px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      {account.type === constants.AccountType.CREDIT_CARD && (
        <SettingsPanel account={account} />
      )}
      <Box sx={{ width: '70%', padding: '5px' }}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <AccountName account={account} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: '50px',
            paddingRight: '50px',
          }}
        >
          <BalanceDisplay
            label='Current Balance'
            balance={completedBalance}
          />
          <BalanceDisplay
            label='Pending Balance'
            balance={pendingBalance}
          />
          <BalanceDisplay
            label='Scheduled Balance'
            balance={scheduledBalance}
          />
          <BalanceDisplay
            label='Future Balance'
            balance={futureBalance}
          />
        </Box>
        <Box>
          <TextField
            id='filter'
            label='Filter'
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            variant='outlined'
            size='small'
            sx={{ width: '100%' }}
          />
        </Box>
        <LedgerTable filterValue={filterValue} />
        <NewTransactionButton />
        <RepeatedTransactionsModal />
      </Box>
    </Box>
  );
}
