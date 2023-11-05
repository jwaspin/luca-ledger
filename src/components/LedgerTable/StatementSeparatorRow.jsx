import { TableCell, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function StatementSeparatorRow({ statementDate }) {
  if (statementDate === 'Invalid Date') {
    return null;
  }
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <Typography>Statement {statementDate}</Typography>
      </TableCell>
    </TableRow>
  );
}

StatementSeparatorRow.propTypes = {
  statementDate: PropTypes.string.isRequired,
};
