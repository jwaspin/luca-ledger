import { TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

export default function SeparatorRow({
  transaction,
  previousTransaction,
  isCollapsed,
  onToggleCollapse,
  isYear,
}) {
  const headerStyle = {
    backgroundColor: isYear ? '#f0f0f0' : '#f8f8f8',
    cursor: 'pointer',
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '4px 0',
  };

  const textStyle = {
    fontWeight: isYear ? 600 : 500,
    fontSize: isYear ? '1.2rem' : '1.1rem',
    lineHeight: 1,
  };

  const getDisplayDate = () => {
    if (isYear) {
      return dayjs(transaction.date).format('YYYY');
    }
    return dayjs(transaction.date).format('MMMM YYYY');
  };

  if (
    previousTransaction &&
    (isYear
      ? dayjs(transaction.date).year() ===
        dayjs(previousTransaction.date).year()
      : dayjs(transaction.date).format('MMYYYY') ===
        dayjs(previousTransaction.date).format('MMYYYY'))
  ) {
    return null;
  }

  return (
    <TableRow
      onClick={onToggleCollapse}
      style={headerStyle}
      sx={{ '& .MuiTableCell-root': { padding: isYear ? '16px' : '8px' } }}
    >
      <TableCell colSpan={6}>
        <div style={containerStyle}>
          {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          <span style={textStyle}>{getDisplayDate()}</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

SeparatorRow.propTypes = {
  transaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
  previousTransaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }),
  isCollapsed: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
  isYear: PropTypes.bool,
};

SeparatorRow.defaultProps = {
  isYear: false,
};
