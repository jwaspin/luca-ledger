import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import CreditCardSettings from '@/components/CreditCardSettings';
import LedgerTable from '@/components/LedgerTable';
import RepeatedTransactionsModal from '@/components/RepeatedTransactionsModal';
import { constants, selectors } from '@/store/accounts';
import AccountNameDisplay from './AccountNameDisplay';
import AccountTypeDisplay from './AccountTypeDisplay';
import BalanceDisplay from './BalanceDisplay';
import NewTransactionButton from './NewTransactionButton';

export default function AccountLedger() {
  const { accountId } = useParams();
  const navigate = useNavigate();
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
        <CreditCardSettings account={account} />
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
            height: 'calc(100vh - 330px)',
            overflowY: 'scroll',
          }}
        >
          <LedgerTable />
        </Box>
        <NewTransactionButton />
        <RepeatedTransactionsModal />
      </Box>
    </Box>
  );
}
