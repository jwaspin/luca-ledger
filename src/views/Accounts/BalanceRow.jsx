import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import BalanceDifference from './BalanceDifference';

export default function BalanceRow({ account, balanceType, filterArray }) {
  const total = account.transactions
    .filter((t) => filterArray.includes(t.status))
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const formattedTotal = Math.abs(total).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Typography
      variant='body1'
      color='text.secondary'
      style={{
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <span style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <span>{balanceType}</span>
        <span style={{ marginLeft: 'auto', textAlign: 'right', minWidth: 100 }}>
          <BalanceDifference
            transactions={account.transactions}
            filterArray={filterArray}
          />
        </span>
      </span>
      <span
        style={{
          color: total < 0 ? 'red' : undefined,
          textAlign: 'right',
          minWidth: 100,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {total < 0 ? '-' : ''}
        {'$'}
        {formattedTotal}
      </span>
    </Typography>
  );
}

BalanceRow.propTypes = {
  account: PropTypes.object.isRequired,
  balanceType: PropTypes.string.isRequired,
  filterArray: PropTypes.array.isRequired,
};
