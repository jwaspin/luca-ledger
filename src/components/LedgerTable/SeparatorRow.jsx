import { TableCell, TableRow, Box } from '@mui/material';
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
      sx={{
        backgroundColor: isYear ? '#A0A0A0' : '#e0e0e0',
        cursor: 'pointer',
        '& .MuiTableCell-root': { padding: isYear ? '16px' : '8px' },
      }}
    >
      <TableCell colSpan={6}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '4px 0',
            '& > span': {
              fontWeight: isYear ? 600 : 500,
              fontSize: isYear ? '1.2rem' : '1.1rem',
              lineHeight: 1,
            },
          }}
        >
          {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          <span>{getDisplayDate()}</span>
        </Box>
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
