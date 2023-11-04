import { TableCell } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actions } from '@/store/transactions';

import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButtonCell({ transaction }) {
  const dispatch = useDispatch();
  const { accountId } = useParams();

  const handleDelete = () => {
    dispatch(actions.removeTransaction(accountId, transaction));
  };

  return (
    <TableCell style={{ width: '50px' }}>
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
