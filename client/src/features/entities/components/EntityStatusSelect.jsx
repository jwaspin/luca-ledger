import { Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const EntityStatusSelect = ({ entityStatus, onEntityStatusChange }) => {
  const statuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'CLOSED'];

  return (
    <Select
      value={entityStatus}
      onChange={(e) => onEntityStatusChange(e.target.value)}
    >
      {statuses.map((status) => (
        <MenuItem
          key={status}
          value={status}
        >
          {status}
        </MenuItem>
      ))}
    </Select>
  );
};

EntityStatusSelect.propTypes = {
  entityStatus: PropTypes.string.isRequired,
  onEntityStatusChange: PropTypes.func.isRequired,
};

export default EntityStatusSelect;
