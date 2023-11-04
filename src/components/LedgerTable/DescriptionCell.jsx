import { Box, Button, TableCell, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actions, constants } from '@/store/transactions';

export default function DescriptionCell({ transaction }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState(transaction.description);

  const handleSave = () => {
    dispatch(
      actions.updateTransactionProperty(
        accountId,
        transaction,
        constants.TransactionFields.DESCRIPTION,
        description
      )
    );
    setEdit(false);
  };

  const handleCancel = () => {
    setDescription(transaction.description);
    setEdit(false);
  };

  return (
    <TableCell style={{ width: '500px' }}>
      {edit ? (
        <Box>
          <TextField
            variant='filled'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
        </Box>
      ) : (
        <Typography
          variant='body1'
          style={{ cursor: 'pointer' }}
          onClick={() => setEdit(true)}
        >
          {transaction.description === ''
            ? 'Enter description here'
            : transaction.description}
        </Typography>
      )}
    </TableCell>
  );
}

DescriptionCell.propTypes = {
  transaction: PropTypes.object.isRequired,
};
