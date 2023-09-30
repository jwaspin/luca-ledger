import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RepeatedTransactionsModal from '@/components/RepeatedTransactionsModal';
import { selectAccountById } from '@/store/accountsSlice';
import LedgerTable from './LedgerTable';
import NewTransactionButton from './NewTransactionButton';

const BalanceDisplay = ({ label, balance }) => {
  const textStyle = {
    color: balance < 0 ? 'red' : 'inherit',
    fontSize: '1.5em',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='body1'
        display='block'
        sx={textStyle}
      >
        {label}
      </Typography>
      <Typography
        variant='subtitle1'
        sx={textStyle}
        display='block'
      >
        $
        {balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Typography>
    </Box>
  );
};

BalanceDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};

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
      <h1>{account.name} Bank</h1>
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
