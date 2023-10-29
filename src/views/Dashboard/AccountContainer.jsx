import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { doublePrecisionFormatString } from '@/utils';

export default function AccountContainer({ account }) {
  const { currentBalance, pendingBalance, scheduledBalance, futureBalance } =
    account;

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={2}
      >
        <Typography variant='h5'>{account.name}</Typography>
      </Grid>
      <Grid
        item
        xs={2}
      >
        <Typography variant='h6'>
          $ {doublePrecisionFormatString(currentBalance)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
      >
        <Typography variant='h6'>
          $ {doublePrecisionFormatString(pendingBalance)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
      >
        <Typography variant='h6'>
          $ {doublePrecisionFormatString(scheduledBalance)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
      >
        <Typography variant='h6'>
          $ {doublePrecisionFormatString(futureBalance)}
        </Typography>
      </Grid>
    </Grid>
  );
}

AccountContainer.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currentBalance: PropTypes.number.isRequired,
    pendingBalance: PropTypes.number.isRequired,
    scheduledBalance: PropTypes.number.isRequired,
    futureBalance: PropTypes.number.isRequired,
  }).isRequired,
};
