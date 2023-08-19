import { Button, TableCell } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import config from '@/config';
import { updateTransaction } from '@/store/transactionsSlice';

export default function DateCell({ transaction }) {
  const [edit, setEdit] = useState(false);
  const [dateValue, setDateValue] = useState(
    dayjs(transaction.date, config.dateFormatString)
  );
  const dispatch = useDispatch();

  const handleSave = () => {
    const newTransaction = { ...transaction };
    newTransaction.date = dateValue.format(config.dateFormatString);
    dispatch(updateTransaction(newTransaction));
    setEdit(false);
  };

  const handleCancel = () => {
    setDateValue(dayjs(transaction.date, config.dateFormatString));
    setEdit(false);
  };

  if (edit) {
    return (
      <TableCell>
        <DatePicker
          value={dateValue}
          onChange={(newValue) => setDateValue(newValue)}
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
      style={{ cursor: 'pointer' }}
      onClick={() => setEdit(true)}
    >
      {dateValue.format('MMM DD')}
    </TableCell>
  );
}

DateCell.propTypes = {
  transaction: PropTypes.object.isRequired,
};
