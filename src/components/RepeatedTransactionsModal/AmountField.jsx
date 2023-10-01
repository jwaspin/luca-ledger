import PropTypes from 'prop-types';
import { TextField, Typography, InputAdornment } from '@mui/material';

const parseFloatDoublePrecision = (value) =>
  parseFloat(parseFloat(value).toFixed(2));

export default function AmountField({ amount, setAmount }) {
  const onAmountChange = (event) => {
    const newValue = event.target.value;
    setAmount(parseFloatDoublePrecision(newValue));
  };

  return (
    <>
      <Typography>Amount</Typography>
      <TextField
        variant='filled'
        fullWidth
        type='number'
        value={amount}
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
