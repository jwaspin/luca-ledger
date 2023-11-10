import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function BalanceDisplay({ label, balance }) {
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
}

BalanceDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};
