import PropTypes from 'prop-types';
import { TextField, Typography, InputAdornment } from '@mui/material';

export default function AmountField({ amount, setAmount }) {
  const onAmountChange = (event) => {
    const newValue = event.target.value;
    setAmount(newValue);
  };

  return (
    <>
      <Typography>Amount</Typography>
      <TextField
        variant='filled'
        fullWidth
        type='number'
        value={typeof amount === 'number' ? amount.toFixed(2) : amount}
        onChange={onAmountChange}
        inputProps={{ step: '0.01' }}
        InputProps={{
          startAdornment: <InputAdornment position='start'>$</InputAdornment>,
        }}
      />
    </>
  );
}

AmountField.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setAmount: PropTypes.func.isRequired,
};
