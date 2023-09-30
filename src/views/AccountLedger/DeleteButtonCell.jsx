import { TableCell } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { removeTransaction } from '@/store/transactionsSlice';

import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButtonCell({ transaction }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();

  const handleDelete = () => {
    const actionPayload = { accountId, transactionId: transaction.id };
    dispatch(removeTransaction(actionPayload));
  };

  return (
    <TableCell>
      <DeleteIcon
        onClick={handleDelete}
        style={{ cursor: 'pointer' }}
      />
    </TableCell>
  );
}

DeleteButtonCell.propTypes = {
  transaction: PropTypes.object.isRequired,
};
