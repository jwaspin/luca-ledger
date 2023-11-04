import { Button, TableCell } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import config from '@/config';
import { actions } from '@/store/transactions';

export default function DateCell({ transaction }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [edit, setEdit] = useState(false);
  const [dateValue, setDateValue] = useState(
    dayjs(transaction.date, config.dateFormatString)
  );

  const handleSave = () => {
    dispatch(
      actions.updateTransactionProperty(
        accountId,
        transaction,
        'date',
        dateValue.format(config.dateFormatString)
      )
    );
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
      style={{
        cursor: 'pointer',
        width: '150px',
      }}
      onClick={() => setEdit(true)}
    >
      {dateValue.format('MMM DD YYYY')}
    </TableCell>
  );
}

DateCell.propTypes = {
  transaction: PropTypes.object.isRequired,
};
