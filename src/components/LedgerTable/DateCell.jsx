import { Box, Button, TableCell, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import config from '@/config';
import { actions, constants } from '@/store/transactions';
import { Cancel, Check } from '@mui/icons-material';

export default function DateCell({ transaction }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dateValue, setDateValue] = useState(
    dayjs(transaction.date, config.dateFormatString)
  );

  const handleSave = (value) => {
    dispatch(
      actions.updateTransactionProperty(
        accountId,
        transaction,
        constants.TransactionFields.DATE,
        value.format(config.dateFormatString)
      )
    );
    setIsOpen(false);
    setEdit(false);
  };

  const handleCancel = () => {
    setDateValue(dayjs(transaction.date, config.dateFormatString));
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
    setIsOpen(true);
  };

  const handleChange = (value) => {
    setDateValue(value);
    handleSave(value);
  };

  const buttonStyle = {
    height: '30px',
    width: '75px',
  };

  const editComponent = (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <DatePicker
        value={dateValue}
        onChange={handleChange}
        open={isOpen}
      />
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          variant='contained'
          style={buttonStyle}
          onClick={() => handleSave(dateValue)}
        >
          <Check />
        </Button>
        <Button
          variant='outlined'
          style={buttonStyle}
          onClick={handleCancel}
        >
          <Cancel />
        </Button>
      </Box>
    </Box>
  );

  return (
    <TableCell style={{ cursor: 'pointer', width: '160px' }}>
      {edit ? (
        editComponent
      ) : (
        <Typography onClick={handleEdit}>
          {dateValue.format('MMM DD YYYY')}
        </Typography>
      )}
    </TableCell>
  );
}

DateCell.propTypes = {
  transaction: PropTypes.object.isRequired,
};
