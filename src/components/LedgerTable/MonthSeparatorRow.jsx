import { TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

export default function MonthSeparatorRow({
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
    >
      <TableCell colSpan={6}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          <span style={{ marginLeft: isYear ? 0 : 24 }}>
            {getDisplayDate()}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}

MonthSeparatorRow.propTypes = {
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

MonthSeparatorRow.defaultProps = {
  isYear: false,
};
