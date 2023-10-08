import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RepeatedTransactionsModal from '@/components/RepeatedTransactionsModal';
import { selectAccountById } from '@/store/accountsSlice';
import AccountNameDisplay from './AccountNameDisplay';
import AccountTypeDisplay from './AccountTypeDisplay';
import BalanceDisplay from './BalanceDisplay';
import LedgerTable from './LedgerTable';
import NewTransactionButton from './NewTransactionButton';

export default function AccountLedger() {
  const { accountId } = useParams();
  const account = useSelector(selectAccountById(accountId));
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
    <Box sx={{ width: '60%', mx: 'auto' }}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <AccountNameDisplay account={account} />
        <AccountTypeDisplay account={account} />
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
      <Box
        sx={{
          height: 'calc(100vh - 350px)',
          overflowY: 'scroll',
        }}
      >
        <LedgerTable />
      </Box>
      <NewTransactionButton />
      <RepeatedTransactionsModal />
    </Box>
  );
}
