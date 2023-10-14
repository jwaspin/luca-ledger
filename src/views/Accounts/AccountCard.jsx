import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function AccountCard({ account }) {
  const navigate = useNavigate();

  const cardLength = '320px';

  return (
    <Card
      onClick={() => navigate(`/accounts/${account.id}`)}
      sx={{
        width: cardLength,
        height: cardLength,
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          cursor: 'pointer',
        },
      }}
    >
      <CardContent>
        <Typography variant='h4'>{account.name}</Typography>
        <Typography variant='subtitle1'>{account.type}</Typography>
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
              .filter((t) => ['complete ', 'pending '].includes(t.status))
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
                ['complete ', 'pending ', 'scheduled '].includes(t.status)
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
  );
}

AccountCard.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number.isRequired, // Example: ID is a number and required
    name: PropTypes.string.isRequired, // Example: Name is a string and required
    type: PropTypes.string.isRequired, // Example: Type is a string and required
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.string.isRequired, // Example: Status is a string and required
        amount: PropTypes.number.isRequired, // Example: Amount is a number and required
      })
    ).isRequired, // Example: Transactions is an array of objects with specific properties
  }).isRequired,
};
