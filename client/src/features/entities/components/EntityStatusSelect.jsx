import { Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const EntityStatusSelect = ({ entityStatus, onChange }) => {
  const statuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'CLOSED'];

  return (
    <Select
      value={entityStatus}
      onChange={(e) => onChange(e.target.value)}
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
  onChange: PropTypes.func.isRequired,
};

export default EntityStatusSelect;
