import { Button, InputAdornment, TableCell, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actions } from '@/store/transactions';
import {
  doublePrecisionFormatString,
  parseFloatDoublePrecision,
} from '@/utils';

export default function AmountCell({ transaction }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(
    parseFloatDoublePrecision(transaction.amount)
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(parseFloatDoublePrecision(value));
  };

  const handleSave = () => {
    dispatch(
      actions.updateTransactionProperty(accountId, transaction, 'amount', value)
    );
    setEdit(false);
  };

  const handleCancel = () => {
    setValue(parseFloatDoublePrecision(transaction.amount));
    setEdit(false);
  };

  if (edit) {
    return (
      <TableCell>
        <TextField
          variant='filled'
          type='number'
          value={value}
          onChange={handleChange}
          inputProps={{ step: '0.01' }}
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
        />
        <Button
          variant='contained'
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant='outlined'
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </TableCell>
    );
  }

  return (
    <TableCell
      style={{ cursor: 'pointer', width: '150px' }}
      onClick={() => setEdit(true)}
    >
      $ {doublePrecisionFormatString(transaction.amount)}
    </TableCell>
  );
}

AmountCell.propTypes = {
  transaction: PropTypes.object.isRequired,
};
